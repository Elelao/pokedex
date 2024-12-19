import $fs from 'fs';
import $path from 'path';

import { environment } from './environment';

const API_URL_REGEX = new RegExp(`^${environment.apiUrl}`);

beforeAll(async () => {
  await page.setRequestInterception(true);

  page.on('request', (request) => {
    if (!API_URL_REGEX.test(request.url())) {
      request.continue();
      return;
    }

    // whitelist preflight requests
    if (request.method() === 'OPTIONS') {
      request.respond({
        status: 204,
        headers: {
          'access-control-allow-headers': 'authorization',
          'access-control-allow-methods': 'GET',
          'access-control-allow-origin': '*',
          'access-control-max-age': '0',
          'cache-control': 'no-cache, private',
          vary: 'Access-Control-Request-Method, Access-Control-Request-Headers',
        },
      });
      return;
    }

    const path = request
      .url()
      .replace(API_URL_REGEX, '')
      .replace(/[^a-z0-9]/g, '_');

    const mockFilePath = $path.resolve(`e2e/mocks/${path}.json`);
    if ($fs.existsSync(mockFilePath)) {
      request.respond({
        status: 200,
        contentType: 'application/json',
        body: $fs.readFileSync(mockFilePath, { encoding: 'utf8', flag: 'r' }),
      });
      return;
    }

    // unmocked request
    request.continue();
  });
});
