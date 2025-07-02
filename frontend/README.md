# Project Setup

This repo contains a Strapi backend and an Expo React Native frontend.

## Installation
Run `npm install` in each directory:

```shell
cd backend
npm install
cd ../frontend
npm install
```

Any shell works—bash, zsh, or PowerShell.

## Running the apps
- **Backend (Strapi)**
  ```shell
  npm run develop
  ```
  Starts Strapi in development mode.

- **Frontend (Expo)**
  ```shell
  npm start
  ```
  Launches the Expo development server.

## Environment variables
`frontend/app.json` defines `STRAPI_URL` in the `extra` section:

```json
"extra": {
  "STRAPI_URL": "http://localhost:1337/api"
}
```

Update this to match the URL of your Strapi server.

