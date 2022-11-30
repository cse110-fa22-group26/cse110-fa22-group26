# Using jest over Qunit

- Status: accepted
- Deciders: Team + Team Leaders
- Date: 2022-11-29

## Context and Problem Statement

What testing framework we can use to test our app and write unit tests for it

## Decision Drivers

- We want to minimize complexity
- We want to make it easier for team members to use tools we are familiar with
- We want it to be efficient

## Considered Options

- Jest
- Qunit

## Decision Outcome

Chosen option: Jest, because it has is the easiest option given that most of the team members used it in the lab it was easier to choose this option.

### Positive Consequences <!-- optional -->

- less new technologies to learn
- team has familiarity with using jst as of Lab
- simplifies development

### Negative Consequences <!-- optional -->

- doesn't really apply in our case but Qunit is better when frameworks like jquery need to get tested

## Pros and Cons of the Options <!-- optional -->

### Jest

- Good, because team members have used it
- Good, provides assertion library by default.
- Good, because it is simple to use
- Bad, because might not be useful in some cases such as jquery which we don't use

### Qunit

- Good, because it is designed specifically for testing and
- Bad, because not a lot of team members are familiar with this
