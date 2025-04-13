 Cypress.Commands.add('sentRequest', (type: string, endpoint: string, payload?: object) => {
    cy.log(`trying sent request to ${endpoint} with body ${JSON.stringify(payload)}`)
                cy.request({
                    method: type,
                    url: endpoint,
                    failOnStatusCode: false,
                    headers: {
                        Authorization: Cypress.env('token'),
                        Accept: 'application/json',
                    },
                    body: payload,
                }).then((resp: Cypress.Response<Body>) => {
                    cy.wait(2000)
                    cy.log(`${type} Response status: ${resp.status} - ${resp.statusText}`);
                    cy.log(`request body ${JSON.stringify(payload)}`);
                    cy.log(`response body ${JSON.stringify(resp.body)}`);
                    cy.wrap(resp.status).as('statusCode');
                    cy.wrap(resp.body).as('obtainedResponse');

                });
            })

Cypress.Commands.add('checkStatusCode', (code: number) => {
    cy.get<string>('@statusCode').then((statusCode: string) => {
            expect(Number(statusCode)).to.be.eq(Number(code));
    });
});

Cypress.Commands.add('extractAlias', <T>(responseAlias: string, aliasName: string, path: (resp: T) => string) => {
    cy.get<T>(responseAlias).then((resp: T) => {
        const key = path(resp);
        cy.wrap(key).as(aliasName);
    });
});

Cypress.Commands.add('checkValueInResponseBody', <T>(responseAlias: string, key: string, expectedValue: string) => {
    cy.get<T>(responseAlias).then((resp: T) => {
        const actualValue = String(resp[key as keyof T]);
        expect(actualValue).to.eq(expectedValue);
    });
});