import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        // setupNodeEvents(on, config) {
        //     // implement node event listeners here
        // },
        baseUrl: "http://localhost:3000",
        supportFile: "tests/cypress/support/e2e.ts",
        specPattern: "tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
        fixturesFolder: "tests/cypress/fixtures",
    },
});
