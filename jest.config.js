export default {
    roots: ["<rootDir>/src", "<rootDir>/tests"],
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
