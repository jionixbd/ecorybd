import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/src/**/_*.{js,jsx,ts,tsx}",
    "!<rootDir>/src/**/*.stories.{js,jsx,ts,tsx}",
    "!<rootDir>/src/**/*.d.ts",
  ],
  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  maxWorkers: "50%",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/public/(.*)$": "<rootDir>/public/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  testMatch: [
    "<rootDir>/tests/unit/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/tests/integration/**/*.{js,jsx,ts,tsx}",
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/tests/e2e/"],
};

export default createJestConfig(config);
