# Firebase Auth

## Description

This repo contains a simple Firebase auth service.

App features:

- Register using email/password
- Register using Google provider (OAuth2)
- Login using email/password
- Login using Google provider (OAuth2)
- Link email/password credential to Google
- Simple Dashboard

This project built with [Vite](https://vite.dev) + [React](https://react.dev) in [Bun](https://bun.sh) environment, but you can also use [Node.js](https://nodejs.org) to run this project.

[React Bootstrap](https://react-bootstrap.netlify.app) used for front end framework.

## How to Run

1. Create a [Firebase](https://console.firebase.google.com) project
2. Create an web app on the `Project Overview`
3. Copy the `firebaseConfig` object
4. Go to `Build > Authentication > Sign-in method`, then activate `Email/Password` and `Google` provider
5. Create `.env` on the root of this project by copy-paste `.env.example` provided
6. Fill values on `.env` file obtained from `firebaseConfig` object (step 3)
7. Install dependencies
   ```bash
   bun install
   # or
   npm install
   ```
8. Run the project
   ```bash
   bun run dev
   # or
   npm run dev
   ```
