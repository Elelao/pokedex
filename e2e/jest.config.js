globalThis.ngJest = {
  skipNgcc: true,
  tsconfig: 'e2e/tsconfig.spec.json',
};

module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testTimeout: 22_000,
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
