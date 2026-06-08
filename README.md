# blog api task

This is a task to build a simple blog API with Node.js, Express, and Prisma.

## Features

- **Authentication** – Register and login with JWT
- **blog** - CRUD operations for blog posts
- **user** - get user list with search and pagination, each user has many blogs
- **API documentation** – Swagger UI at `/api-docs`

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Language:** javaScript
- **Database:** sqlit
- **Auth:** JWT (jsonwebtoken), bcrypt
- **Docs:** Swagger (swagger-jsdoc, swagger-ui-express)

## Prerequisites

- Node.js (v18+)
- sqlit

## env file

- PORT= 3000
- JWT_SECRET_CODE
- JWT_EXPIRES_IN
- DATABASE_URL="file:./dev.db"

---

- in order to run the project :
- step 1: npm i
- step 2: npm start
- then you can see the Swagger documentation on :
- http://localhost:3000/api-docs
