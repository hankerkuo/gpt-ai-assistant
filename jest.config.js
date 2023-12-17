/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1"
  },
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "js"],
  setupFiles: ['<rootDir>/jest.setup.js'],
};