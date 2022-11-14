# Using LocalStorage and JSON over IndexedDB

- Status: accepted
- Deciders: Sepehr Heravi, Weiwen Dong
- Date: 2022-10-20

## Context and Problem Statement

How should we store user created content and preferences? Specifically, how should user login info and weekly tasks be stored and accessed

## Decision Drivers

- We want to minimize complexity
- We want to make it easier for team members to use tools we are familiar with

## Considered Options

- IndexedDB
- LocalStorage / JSON

## Decision Outcome

Chosen option: LocalStorage and JSON, because it has the lowest barrier of entry while maintaining CRUD features. Additionally, guidance from the TA indicated they would favor an approach using localStorage and since most of the team members used it in the lab it was easier to choose this option.

### Positive Consequences <!-- optional -->

- less new technologies to learn
- team has familiarity with using localStorage as of Lab8
- simplifies development

### Negative Consequences <!-- optional -->

- user experience is not as good
- users info (including password is shown in local storage)

## Pros and Cons of the Options <!-- optional -->

### Firebase

Store all recipes (user and community) in a Firebase instance. Manage user authentication with built-in Firebase methods <!-- optional -->

- Good, because it is a dependable framework developed by Google
- Good, because it has authentication built in
- Good, because it maximizes user experience
- Bad, because many developers on the team are unfamiliar
- Bad, because the professor and TAs did not support using it

### IndexedDB

- Good, because it is designed specifically for database
- Bad, because not a lot of team members are familiar with this

### LocalStorage / JSON

- Good, because easier to develop
- Good, because more team members are familiar
- Bad, because it hurts the user experience
- Bad, because it displays user private info in local storage
