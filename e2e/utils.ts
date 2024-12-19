import { environment } from './environment';

export interface SpeciesShort {
  id: number;
  name: string | '???';
  image: string;
}

export interface Species {
  id: number;
  name: string;
  image: string;
  genre: string;
  description: string;
  weight: number;
  height: number;
  types: string[];
}

export async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function fakeLogin() {
  await page.goto(environment.appUrl);

  await page.evaluate(() => {
    window.localStorage.setItem('trainer-token', 'fake-token');
  });
}

export async function hijackSpeciesResponse<T>(method: 'GET' | 'POST', url: string) {
  const rawResponse = await page.waitForResponse((res) => {
    return res.url() === url && res.request().method() === method;
  });
  expect(rawResponse).toBeTruthy();

  const response = await rawResponse.json();
  expect(response).toBeTruthy();

  return response as { data: T };
}
