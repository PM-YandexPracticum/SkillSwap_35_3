/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // настройки для ts-jest
      }
    ]
  },
  moduleNameMapper: {
    '^@api(.*)$': '<rootDir>/src/utils/burger-api$1',
    '^@api$': '<rootDir>/src/utils/burger-api',

    '^@services(.*)$': '<rootDir>/src/services$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@types(.*)$': '<rootDir>/src/utils/types$1',

    '^../utils/burger-api$': '<rootDir>/src/utils/burger-api',
    '^../utils/cookie$': '<rootDir>/src/utils/cookie',
    '^../utils/types$': '<rootDir>/src/utils/types'
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8'
};

export default config;
