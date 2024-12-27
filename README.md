<img width="1070" alt="GitHub Repo Cover" src="https://github.com/corbado/corbado-php/assets/18458907/aa4f9df6-980b-4b24-bb2f-d71c0f480971">

# Typescript Vue.js and Express.js Passkey Example App

This is a sample implementation of
the [Corbado web-js](https://github.com/corbado/javascript/tree/develop/packages/web-js) package
and [Corbado Node.js](https://github.com/corbado/corbado-nodejs)
SDK being integrated into a web
application built with Express.js on the backend and Vue.js on the frontend.

## File structure

- `frontend`: Separate directory for the Vue.js frontend
- `frontend/.env.example`: Example file for environment variables
- `frontend/src/views`: Contains all pages used in the frontend
- `frontend/src/router/index.ts`: Contains the route definitions
- `frontend/src/stores/user.ts`: Global store for user data from Corbado and our own backend
- `backend`: Separate directory for the Express.js backend
- `backend/.env.example`: Example file for environment variables
- `backend/src/app.ts`: configuration file for the Express app
- `backend/src/utils`: collection of utility functions, e.g. helper functions for authentication
- `backend/src/routes`: directory configuring the routes for the app
- `backend/src/controller`: controllers for the routes
- `backend/src/middleware`: middleware, e.g. for authentication
  

## Setup

### Prerequisites

Please follow the steps in [Getting started](https://docs.corbado.com/overview/getting-started) to create and configure
a project in the [Corbado developer panel](https://app.corbado.com/).

You need to have [Node](https://nodejs.org/en/download) and `npm` installed to run it.

### Configure environment variables

Use the values you obtained in [Prerequisites](#prerequisites) to configure the following variables inside a `.env`
file you create in frontend and backend directories respectively:

#### Backend

The backend needs an api secret to authenticate with the Corbado backend API.

```dotenv
CORBADO_PROJECT_ID=pro-XXX
CORBADO_API_SECRET=corbado1_XXX
CORBADO_FRONTEND_API=https://{$CORBADO_PROJECT_ID}.frontendapi.cloud.corbado.io
CORBADO_BACKEND_API=https://backendapi.cloud.corbado.io
```

#### Frontend

The frontend needs the project ID and the backend base URL.

```dotenv
VITE_CORBADO_PROJECT_ID=pro-XXX
VITE_BACKEND_BASE_URL=http://localhost:3001
```

## Usage

### Run the project locally

Run the following command in the root directory

```bash
(cd backend && npm install)
(cd frontend && npm install)
```

to install all dependencies.

Finally, you can run the project locally with the provided start script or individually for frontend and backend.

#### Using the start script

```bash
./start.sh
```

#### Running frontend and backend individually

In one terminal session, run the following command in the `frontend` directory:
```bash
npm run dev
```

In another terminal session, run the following command in the `backend` directory:
```bash
npm run start
```
