# Kanban Board

This project is a Kanban board application designed to help an online mental health clinic track new member bookings. The application was built using ReactJS with TypeScript for the frontend, NestJS for the backend, and PostgreSQL with TypeORM for data persistence. Tailwind CSS was used for styling to maintain a clean and responsive user interface.

## Author

- [Mohamed Farag](https://github.com/MohamedFarag107)

## Demo

- [frontend](https://mfarag.me)
- [backend swagger](https://api.mfarag.me/api/v1/swagger)

## Features

- Form Validation: Validations are implemented for each form field (Name, Title, Age, Email, Mobile Number) to ensure data correctness.
- CRUD Operations: Allows creating, reading, updating, and deleting member cards on the Kanban board.
- Card Status Management: Ability to move cards between different board columns.
- SQL Database Persistence: Data is stored in a PostgreSQL database for persistence.
- Column Card Count: Displays dynamic counts for each column.
- Additional Ordering Endpoint: Allows ordering of cards within the same or across different columns (documented in Swagger).
- Clean Styling: A responsive and user-friendly interface using Tailwind CSS.

# How To Get Started

<!-- pre requirement -->

## Pre Requirement

### Install `win-node-env` globally if you are using Windows

```bash
npm install -g win-node-env
```

### Run Docker Container for PostgreSQL or you can use your own PostgreSQL

```bash
docker run --name kanban_board -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

### Create `.env.development` for development and `.env.production` for production:

## .env.development for Backend

```bash
PORT=3000
NODE_ENV="development"
DB_HOST= "localhost"
DB_PORT= 5432
DB_USER_NAME= "postgres"
DB_PASSWORD= "postgres"
DB_NAME= "postgres"
CLIENT_ORIGIN= "http://localhost:3000"
```

## .env.development for Frontend

```bash
VITE_SERVER_URL=http://localhost:3000
```

### Install Dependencies (Frontend & Backend)

```bash
npm i
```

### Run Development (Frontend)

```bash
npm dev
```

### Run Development (Backend)

```bash
yarn start:dev
```

### Run Production (Frontend)

```bash
yarn build
npm run preview
```

### Run Production (Backend)

```bash
npm run build
npm run start:prod
```
