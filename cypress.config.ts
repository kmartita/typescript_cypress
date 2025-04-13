import { defineConfig } from "cypress";
import createBundler  from "@bahmutov/cypress-esbuild-preprocessor";
import {addCucumberPreprocessorPlugin} from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
import allureWriter from "@shelex/cypress-allure-plugin/writer";
import dotenv from 'dotenv';
dotenv.config();

async function setupNodeEvents(
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);
  require("cypress-mochawesome-reporter/plugin")(on)

  on(
      "file:preprocessor",
      createBundler({
        // @ts-ignore
        plugins: [createEsbuildPlugin(config)],
      })
  );
  allureWriter(on,config)

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  projectId: "xw17vy",
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/e2e/features/**/*.feature",
    viewportWidth: 10,
    viewportHeight: 10,
    chromeWebSecurity: false,
    video: false,
    env: {
      base_url: "https://api.clickup.com/api/v2",
      token: process.env.TOKEN,
      allureReuseAfterSpec: true,
    },
  },
});