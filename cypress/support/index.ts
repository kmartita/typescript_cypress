declare namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-namespace
        interface Chainable {
            checkStatusCode(code:number): Chainable
            sentRequest(type: string, endpoint: string, code?, payload?, schema?): Chainable
            extractAlias<T>(responseAlias: string, aliasName: string, idPath: (resp: T) => string): Chainable;
            checkValueInResponseBody<T>(responseAlias: string, key: string, expectedValue: string): Chainable;
        }
}