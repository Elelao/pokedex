import { environment } from '../environment';
import { fakeLogin, hijackSpeciesResponse, SpeciesShort } from '../utils';

describe('List page', () => {
  beforeAll(fakeLogin);

  it('is plugged to the API and displays text data', async () => {
    void page.goto(environment.appUrl);

    const response = await hijackSpeciesResponse<SpeciesShort[]>(
      'GET',
      `${environment.apiUrl}/species`
    );

    const bodyTextContent = await page.evaluate(() => document.body.textContent?.toLowerCase());
    for (const species of response.data) {
      expect(bodyTextContent).toContain(species.id.toString());
      expect(bodyTextContent).toContain(species.name);
    }
  });

  it('displays species images', async () => {
    void page.goto(environment.appUrl);

    const response = await hijackSpeciesResponse<SpeciesShort[]>(
      'GET',
      `${environment.apiUrl}/species`
    );

    for (const species of response.data) {
      const imgCount = await page.$$eval(
        `img[src="${species.image}"]`,
        (imgElements: Element[]) => imgElements.length
      );
      expect(imgCount).toBeGreaterThanOrEqual(1);
    }
  });
});
