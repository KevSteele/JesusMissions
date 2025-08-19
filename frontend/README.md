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

Create a `.env` file in the frontend directory:

```env
EXPO_PUBLIC_STRAPI_URL=http://localhost:1337/api
EXPO_PUBLIC_JOSHUA_API_URL=https://your-joshua-api-url.com
```

Update these URLs to match your backend servers.
