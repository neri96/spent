// jest.config.ts
export default {
  preset: "ts-jest", // Use ts-jest for transforming TypeScript files
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Use ts-jest for TypeScript files
    "^.+\\.jsx?$": "babel-jest", // Use babel-jest for JS/JSX files
  },
  moduleNameMapper: {
    // Map static assets (like images) to an empty module (optional)
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "^@common/(.*)$": "<rootDir>/src/common/$1", // map @common/* to the actual path
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@features/(.*)$": "<rootDir>/src/features/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@ts/(.*)$": "<rootDir>/src/ts/$1",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transformIgnorePatterns: [
    "/node_modules/(?!(@nivo|d3-|d3-interpolate|d3-format|d3-time|d3-time-format|d3-shape)/)", // Include any necessary node_modules here
  ],
};
