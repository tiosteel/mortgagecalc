/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  globalSetup: "./test/setup.ts",
  projects: [
    './srv/site',
    './srv/calculator'
  ]
};

module.exports = config;

