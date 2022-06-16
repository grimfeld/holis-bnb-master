# Holis Test for full-stack developers

Thanks for applying!

For the integrity of the process, please do not distribute or make public the assignment. Thank you!

## Context

Holis really likes Airbnb and wants to have his own BnB website.
The idea is to list all the locations and to also provide a detailed page for each.

## Code provided

We've provided you with a working project that contains:

- A working [NestJS web server](https://docs.nestjs.com/)
- A working [React front app](https://fr.reactjs.org/docs/getting-started.html)
- A PostgreSQL database (see readme of backend)

### Principles

The project follows principles and patterns proposed by NestJS, that we use at Holis.
More specifically, it uses:

- entities for defining our database objects and tables (using [Typeorm](https://typeorm.io/#/))
- controllers for referencing endpoints and validating user input thanks to Data Transfer Objects (dto) and `class-validator` package
- jest for testing
- repositories to make requests at the database level (using [Typeorm](https://typeorm.io/#/))
- services to hold the "business logic"

If you want more details about patterns used in this project, you will probably find answers on NestJS documentation.
