@api
Feature: Goals

@clearGoals
Scenario: User is able to get empty list of goals
    Given Team id is defined
    When User sends GET request to fetch all goals
    Then Status code is equal 200
    And List of goals should be empty

Scenario: User is unable to get goals without specifying a team id
    When User sends GET request to fetch goals without specifying a team id
    Then Status code is equal 500
    And Value "err" in body is equal "invalid input syntax for integer: \"goal\""
    And Value "ECODE" in body is equal "SHARD_001"

Scenario: User is able to create a new goal with all required fields
    Given User id is defined
    When User sends POST request to create goal from file 'goals/create_goal.json'
    And User gets goal id from body and saves as alias
    Then Status code is equal 200
    And New goal should be created

Scenario: User is able to get list of goals
    When User sends GET request to fetch all goals
    Then Status code is equal 200
    And List of goals should be not empty

Scenario: User is unable to create a goal without including required fields
    When User sends POST request to create goal from file 'goals/invalid_goal.json'
    Then Status code is equal 500
    And Value "err" in body is equal "null value in column \"name\" violates not-null constraint"
    And Value "ECODE" in body is equal "GOAL_006"

Scenario: User is able to get a specific goal
    When User sends GET request to fetch a goal by id
    Then Status code is equal 200
    And Specific goal should be identified

Scenario: User is able to update an existing goal with valid data
    When User sends PUT request to upadate goal by id with updated data
    Then Status code is equal 200
    And The goal should be updated

Scenario: User is unable to update an existing goal with invalid data
    When User sends PUT request to update goal by id with invalid boolean type
    Then Status code is equal 500
    And Value "err" in body is equal "invalid input syntax for type boolean: \"invalid\""
    And Value "ECODE" in body is equal "GOAL_015"

Scenario: User is able to delete an existing goal
    When User sends DELETE request to delete goal by id: "scenario_goal_id"
    Then Status code is equal 200
    And Response body is empty

@createGoal
Scenario: User is unable to delete non-existent goal
    Given Additional goal id is defined
    And Additional goal id become invalid
    When User sends DELETE request to delete goal by id: "invalid_goal_id"
    Then Status code is equal 500

Scenario Outline: User is able to create different types of key result for one goal
    When User sends POST request to create key result with: name "<name>", type "<type>", start <start>, end <end>, unit <unit>
    Then Status code is equal 200
    Examples:
        | name        | type       | start   | end    | unit  |
        | Number      | number     | 0       | 10     | km    |
        | Boolean     | boolean    | null    | null   | null  |    
        | Currency    | currency   | 0       | 5000   | USD   |
        | Percentage  | percentage | 0       | 100    | %     |      