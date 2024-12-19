import { environment } from '../environment';
import { fakeLogin, hijackSpeciesResponse, Species } from '../utils';

describe('Details page', () => {
  beforeAll(fakeLogin);

  it('is plugged to the API and displays text data', async () => {
    void navigateToPikachePage();

    const response = await hijackSpeciesResponse<Species>(
      'GET',
      `${environment.apiUrl}/species/25`
    );

    const bodyTextContent = await page.evaluate(() => document.body.textContent?.toLowerCase());

    expect(bodyTextContent).toContain(response.data.id.toString());
    expect(bodyTextContent).toContain(response.data.name.toLowerCase());
    expect(bodyTextContent).toContain(response.data.genre.toLowerCase());
    expect(bodyTextContent).toContain(response.data.description.toLowerCase());
    expect(bodyTextContent).toContain(response.data.weight.toString());
    expect(bodyTextContent).toContain(response.data.height.toString());

    for (const type of response.data.types) {
      expect(bodyTextContent).toContain(type);
    }
  });

  it('displays species image', async () => {
    void navigateToPikachePage();

    const response = await hijackSpeciesResponse<Species>(
      'GET',
      `${environment.apiUrl}/species/25`
    );

    const imgCount = await page.$$eval(
      `img[src="${response.data.image}"]`,
      (imgElements: Element[]) => imgElements.length
    );
    expect(imgCount).toBeGreaterThanOrEqual(1);
  });
});

async function navigateToPikachePage() {
  await page.goto(environment.appUrl);

  await page.$$eval('*', (elements) => {
    if (!elements) {
      return;
    }

    const pikachuElement = Array.from(elements).find(
      (el) => !!(el.textContent && el.textContent.trim().toLowerCase() === 'pikachu')
    );

    if (!pikachuElement) {
      throw new Error(
        'Details page tests did not find an element with the species name on the species list page. Are you sure this page is done and functional?'
      );
    }

    (pikachuElement as HTMLElement).click();
  });
}
