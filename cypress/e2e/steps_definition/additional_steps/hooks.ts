import { Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { Teams } from "@test-data/data-objects/response/teams";
import { Goals } from "@test-data/data-objects/response/goals";
import { config } from '@config/config';
import { teamconfig } from '@config/teamconfig';
import { entityconfig } from '@config/entityconfig';
import { faker } from '@faker-js/faker';

declare global {
    interface CustomConfigOptions extends Cypress.TestConfigOverrides {
        user_id?: number;
        team_id?: string;
        goal_id?: string;
    }
}

let user_id: number, team_id: string, goal_id: string;

const BASE_URL = Cypress.env('base_url') as string;
const USER_NAME = config.data.user.name as string;

Before(async () => {
    const config = Cypress.config() as CustomConfigOptions;

    cy.sentRequest('get', `${BASE_URL}/team`);
    cy.get<Teams>('@obtainedResponse').then((resp: Teams) => {
        
        const teams = resp.teams
        teams.forEach((team: { members: { user: { id: string, username: string } }[], id: string }) => {
            team.members.forEach(member => {
                if (member.user.username === USER_NAME) {
                    const userId = Number(member.user.id);
                    cy.wrap(userId).as('userId');

                    config.user_id = userId;
                    user_id = config.user_id as number;

                    const teamId = String(team.id);
                    cy.wrap(teamId).as('teamId');

                    config.team_id = teamId;
                    team_id = config.team_id as string;
                }
            });
        });
    });
});

Before({ tags: '@clearGoals' }, async () => {
    cy.log('Clearing all goals before scenario');
    cy.sentRequest('get', `${BASE_URL}/${teamconfig(team_id).url.entities.goals}`);

    cy.get<Goals>('@obtainedResponse').then((resp: Goals) => {
        const goals = resp.goals
        if (Number(goals.length) === 0) {
            cy.log('No goals found.');
        } else {
            goals.forEach((goal: {id: string}) => {
                const goalId = String(goal.id);
                cy.sentRequest('delete', `${BASE_URL}/${entityconfig(goalId).url.goal}`);
            })
        }
    });
});

Before({ tags: '@createGoal' }, async () => {
    cy.log('Create goal before scenario');
    
    const config = Cypress.config() as CustomConfigOptions;
    const name = faker.name.firstName();

    cy.fixture('goals/create_goal.json').then((body) => {
        body.name = `${name}`;
        body.owners = [user_id];

        cy.sentRequest('post', `${BASE_URL}/${teamconfig(team_id).url.entities.goals}`, body).then(() => {
            
            cy.sentRequest('get', `${BASE_URL}/${teamconfig(team_id).url.entities.goals}`);
            cy.get<Goals>('@obtainedResponse').then((resp: Goals) => {
                const goals = resp.goals;
                
                goals.forEach((goal: { id: string, name: string }) => {
                    if (goal.name === name) {
                        const goalId = String(goal.id);
                        cy.wrap(goalId).as('goalId');

                        config.goal_id = goalId;
                        goal_id = config.goal_id as string;
                    }
                });
            });
        });
    });
});

export { user_id, team_id, goal_id };
    