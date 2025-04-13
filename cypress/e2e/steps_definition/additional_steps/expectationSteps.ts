import {Then} from "@badeball/cypress-cucumber-preprocessor";

Then('User get {string} from body', (value: string) => {
    cy.log(` get ${value} from response body`)
    cy.get<Cypress.Response<Body>>('@obtainedResponse').then((resp: Cypress.Response<Body>) => {
    cy.wrap(String(resp[value])).as(value);
  });
});

Then('User get {string} from body and save as {string}', (value: string, saveAs: string) => {
    cy.get<Cypress.Response<Body>>('@obtainedResponse').then((resp: Cypress.Response<Body>) => {
    cy.wrap(String(resp[value])).as(saveAs);
  });
});

Then('Value {string} in body is equal {string}', (key: string, expectedValue: string) => {
    cy.checkValueInResponseBody<Cypress.Response<Body>>('@obtainedResponse', key, expectedValue);
});

Then('Values {string}, {string} in body are equal {string}', (value1: string, value2: string, expected: string) => {
    cy.get<Cypress.Response<Body>>('@obtainedResponse').then((resp: Cypress.Response<Body>) => {
    let value: object = resp[value1];
    expect(value[value2]).to.eq(expected)
  });
})

Then('Status code is equal {}', (expectedStatusCode: number) => {
    cy.checkStatusCode(expectedStatusCode)
})

