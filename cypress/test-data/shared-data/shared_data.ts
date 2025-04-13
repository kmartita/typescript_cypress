import Response = Cypress.Response;

export default class SharedData {

  public static obtainedResponse;

  public static data: Map<string, string> = new Map();
}
