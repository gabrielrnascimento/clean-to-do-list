export default {
    roots: ["<rootDir>/src", "<rootDir>/tests"],
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/**/App.tsx",
        "!src/**/main.tsx",
        "!src/**/*.d.ts",
        "!src/**/env.ts",
        "!src/**/index.ts",
        "!tests/**/*.mock.ts",
    ],
};
