# Cypress API Testing Project

This is a test automation project that supports API testing using Cypress.<br/>

## Table of Contents
1. Setup Local Machine<br/>
2. Project Overview<br/>
3. Create API Test Scenarios<br/>
4. API Test Execution<br/>
5. JSON Configuration<br/>
6. Additional Features<br/>

## 1. Setup Local Machine
#### This guide assumes the following:
* Latest version of Node.js is installed.<br/>
To get started, run the following command in the terminal:<br/>

  >  npm install
* Ensure all dependencies are installed.<br/>

## 2. Project Overview
This project is designed to automate API testing using Cypress. It provides a structured approach to ensure the API performs as expected, incorporating various HTTP methods and a data-driven approach.<br/>

## 3. Create API Test Scenarios
Creating API test scenarios involves defining test data, expected API behavior, and specific criteria using data-driven approaches.<br/>
1. **Define Test Cases:** <br/>
The `goals.feature` file describes 11 scenarios covering all possible HTTP methods for goals, including one data-driven scenario for key results (4 combinations).<br/>
2. **Implement Scenarios:** <br/>
The `goals_scenarios.ts` file contains implementations for all scenarios described in `goals.feature`, with some functions reusing code from `expectationSteps.ts`.<br/>
3. **Setup Hooks:** <br/>
The `hooks.ts` file implements three hooks, including one that runs before each scenario to fetch `team_id` and `user_id`, storing them in global variables.<br/>

## 4. API Test Execution
To run tests, execute the following command in the terminal: <br/>

  >  npm run cypress:runner

This command initiates the Cypress test runner to execute your API tests.<br/>

## 5. JSON Configuration
Configuration data can be found in `config.ts`, `entityconfig.ts`, and `teamconfig.ts` files, which serve as constants for operations involving different entities and URLs.<br/>

## 6. Additional Features
1. **Custom Commands:** <br/>
The `commands.ts` file includes custom Cypress commands, such as extractAlias, which can handle different types of data and responses using generics.
2. **Use of Faker:** <br/>
The `Faker` library is used to generate random values for testing scenarios.

## 7. Report Overview
![Report](file:///Users/martakravchuk/r_d/API/typescript/CypressApi/cypress/reports/html/index.html)
