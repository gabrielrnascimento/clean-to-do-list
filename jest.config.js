export default {
    roots: ["<rootDir>/src"],
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
