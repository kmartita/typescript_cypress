import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { team_id, user_id, goal_id } from '@e2e/steps_definition/additional_steps/hooks';
import { teamconfig } from '@config/teamconfig';
import { entityconfig } from "@config/entityconfig";
import { Goals } from "@test-data/data-objects/response/goals";
import { Goal } from "@test-data/data-objects/response/goal";
import { faker } from '@faker-js/faker';
import { KeyResultData } from "@test-data/data-objects/objects/key_result_data";

const BASE_URL = Cypress.env('base_url') as string;
let scenario_goal_id: string, invalid_goal_id: string;
const updatedName = String(faker.name.firstName());

Given('Team id is defined', () => {
    cy.log(`Team id (${team_id}) is defined for goals`);
});

When('User sends GET request to fetch all goals', () => {
    cy.sentRequest('GET', `${BASE_URL}/${teamconfig(team_id).url.entities.goals}`);
});

Then('List of goals should be empty', () => {
    cy.get<Goals>('@obtainedResponse').then((resp: Goals) => {
        const goals = resp.goals;
        expect(Number(goals.length)).to.eq(0);
    });
});

When('User sends GET request to fetch goals without specifying a team id', () => {
    cy.sentRequest('get', `${BASE_URL}/${teamconfig("").url.entities.goals}`);
});

Given('User id is defined', () => {
    cy.log(`User id (${user_id}) is defined for goals`);
});

When('User sends POST request to create goal from file {string}', (filename: string) => {
    cy.fixture(filename).then((body) => {
        body.owners = [user_id];
        cy.sentRequest('post', `${BASE_URL}/${teamconfig(team_id).url.entities.goals}`, body);
    });
});

Then('User gets goal id from body and saves as alias', () => {
    cy.extractAlias<Goal>('@obtainedResponse', 'goalId', (resp: Goal) => String(resp.goal.id));
});

Then('New goal should be created', () => {
    cy.get<Goal>('@obtainedResponse').then((resp: Goal) => {
        cy.get<string>('@goalId').then((id: string) => {
            scenario_goal_id = id;
            expect(id).to.not.null;
        });

        expect(resp.goal.name).to.not.null;
        expect(resp.goal.creator).to.eq(user_id);
        expect(resp.goal.owners[0].id).to.eq(user_id);
    });    
});

Then('List of goals should be not empty', () => {
    cy.get<Goals>('@obtainedResponse').then((resp: Goals) => {
        const goals = resp.goals;
        expect(Number(goals.length)).to.not.eq(0);
    });
});

When('User sends GET request to fetch a goal by id', () => {
    cy.sentRequest('get', `${BASE_URL}/${entityconfig(scenario_goal_id).url.goal}`);
});

Then('Specific goal should be identified', () => {
    cy.get<Goal>('@obtainedResponse').then((resp: Goal) => {
        expect(String(resp.goal.id)).to.eq(scenario_goal_id);
    });
});

When('User sends PUT request to upadate goal by id with updated data', () => {
    cy.fixture('goals/create_goal.json').then((body) => {
        body.name = `${updatedName}`;
        cy.sentRequest('put', `${BASE_URL}/${entityconfig(scenario_goal_id).url.goal}`, body);
    });
});

Then('The goal should be updated', () => {
    cy.get<Goal>('@obtainedResponse').then((resp: Goal) => { 
        expect(String(resp.goal.name)).to.eq(updatedName);
        expect(String(resp.goal.id)).to.eq(scenario_goal_id);
    });
});

When('User sends PUT request to update goal by id with invalid boolean type', () => {
    cy.fixture('goals/create_goal.json').then((body) => {
        body.multiple_owners = "invalid";
        cy.sentRequest('put', `${BASE_URL}/${entityconfig(scenario_goal_id).url.goal}`, body);
    });
});

When('User sends DELETE request to delete goal by id: {string}', function (id: string) {
    let goalId;

    switch (id) {
        case 'scenario_goal_id':
            goalId = scenario_goal_id;
            break;
        case 'invalid_goal_id':
            goalId = invalid_goal_id;
            break;
        default:
            goalId = id;
            break;
    }

    const urlConfig = entityconfig(goalId);
    const goalUrl = `${BASE_URL}/${urlConfig.url.goal}`;
    cy.sentRequest('delete', goalUrl);
});

Then('Response body is empty', () => {
    cy.get<Goals>('@obtainedResponse').then((resp: Goals) => {
        expect(Object.keys(resp).length).to.eq(0);
    });
});

Given('Additional goal id is defined', () => {
    cy.log(`Additional Goal id (${goal_id}) is defined`);
});

Then('Additional goal id become invalid', () => {
    invalid_goal_id =`${goal_id}invalid`;
    cy.log(invalid_goal_id);
});

When('User sends POST request to create key result with: name {string}, type {string}, start {word}, end {word}, unit {word}', 
                                                    (name: string, type: string, start: string, end: string, unit: string) => {

    const parseNullableInt = (value: string): number | null => {
        return value.toLowerCase() === 'null' ? null : parseInt(value);
    };

    const parseNullableString = (value: string): string | null => {
        return value.toLowerCase() === 'null' ? null : value;
    };

    const keyResultData: KeyResultData = createKeyResultData(name, type, parseNullableInt(start), parseNullableInt(end), parseNullableString(unit));
    cy.sentRequest('POST', `${BASE_URL}/${entityconfig(goal_id).url.key_result}`, keyResultData);
});

export function createKeyResultData(name: string, 
                                    type: string, 
                                    start: number | null,
                                    end: number | null,
                                    unit: string | null): KeyResultData {
    return {
        name: name,
        type: type,
        owners: [user_id],
        steps_start: start,
        steps_end: end,
        unit: unit,
        task_ids: [],
        list_ids: []
    };
}
