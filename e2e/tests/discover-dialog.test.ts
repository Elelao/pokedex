import * as path from 'path';

import { environment } from '../environment';
import { fakeLogin, sleep } from '../utils';

describe('Discover dialog', () => {
  beforeAll(fakeLogin);

  it('can be opened with a button and has button to close it', async () => {
    await page.goto(environment.appUrl);

    await openTheDialog();

    let matDialog = await page.$('mat-dialog-container');
    expect(matDialog).toBeTruthy();

    const matDialogClosedPromise = closeTheDialog();

    await expect(matDialogClosedPromise).resolves.toBeUndefined();

    matDialog = await page.$('mat-dialog-container');
    expect(matDialog).toBeFalsy();
  });

  it('can submit an image', async () => {
    const filePath = path.resolve('e2e/assets/pikachu.jpg');

    await page.goto(environment.appUrl);

    await openTheDialog();
    await sleep(500);
    await uploadFileToInput(filePath);

    const matDialogButtonsCount = await page
      .$$('mat-dialog-container button')
      .then((buttons) => buttons.length);

    for (let iButton = matDialogButtonsCount - 1; iButton >= 0; iButton--) {
      try {
        void page.$$eval(
          'mat-dialog-container button',
          (buttons, i) => (buttons[i] as HTMLButtonElement).click(),
          iButton
        );

        // wait for the POST request to be made
        const request = await page.waitForRequest(
          (request) => {
            return (
              request.url() === `${environment.apiUrl}/species/identify` &&
              request.method() === 'POST'
            );
          },
          { timeout: 1000 }
        );
        expect(request).toBeTruthy();

        // assert that POST request is shipping a file
        const postHeaders = request.headers();
        expect(postHeaders['content-type'].startsWith('multipart/form-data')).toBe(true);

        return;
      } catch (e) {
        // do nothing, maybe it wasn't the right button

        // reopen dialog if it was closed
        const matDialog = await page.$('mat-dialog-container');
        if (!matDialog) {
          await openTheDialog();
          await sleep(500);
        }

        // re-upload file if it was cleared
        const input = await page.$('mat-dialog-container input[type="file"]');
        if (input) {
          await uploadFileToInput(filePath);
        }
      }
    }

    throw new Error('The test should have succeeded before reaching here :(');
  });
});

async function openTheDialog() {
  const matDialogPromise = await page.$$eval(
    'button',
    (buttons) =>
      new Promise<void>(async (resolve, reject) => {
        for (let i = buttons.length - 1; i >= 0; i--) {
          const button = buttons[i] as HTMLButtonElement;
          button.click();
          await new Promise((resolve) => setTimeout(resolve, 500));
          const matDialog = document.querySelector('mat-dialog-container');

          if (matDialog) {
            resolve();
            return;
          }
        }

        reject();
      })
  );

  try {
    await matDialogPromise;
  } catch (e) {
    throw new Error(
      'Unable to find a button that opens a mat dialog. Are you sure you have a <button> element that triggers the dialog opening?'
    );
  }
}

async function closeTheDialog() {
  return page.$$eval(
    'mat-dialog-container button',
    (buttons) =>
      new Promise<void>(async (resolve, reject) => {
        for (let i = buttons.length - 1; i >= 0; i--) {
          const button = buttons[i] as HTMLButtonElement;
          button.click();
          await new Promise((resolve) => setTimeout(resolve, 500));
          const matDialog = document.querySelector('mat-dialog-container');

          if (!matDialog) {
            resolve();
            return;
          }
        }

        reject();
      })
  );
}

async function uploadFileToInput(filePath: string) {
  // Attach a file to the file input element
  const fileInput = await page.$('mat-dialog-container input[type="file"]');

  if (!fileInput) {
    throw new Error('Unable to find the file input element');
  }

  await fileInput.uploadFile(filePath);
}
