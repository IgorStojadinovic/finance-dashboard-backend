# Finance Dashboard Backend

Backend service for the Finance Dashboard application, providing robust API endpoints and database management.

## Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Features

- 🔐 JWT Authentication
- 🔄 CRUD Operations
- 📊 Data Validation
- 🗄️ PostgreSQL Database
- 🔌 RESTful API
- 🛡️ CORS Protection
- 🔒 Password Hashing
- 📝 Database Migrations

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="your-db-url"
JWT_SECRET="your-jwt-secret"
PORT=3000
```

4. Run Prisma migrations:

```bash
npx prisma migrate dev
```

5. Run the seed script for initial data:

```bash
npx prisma db seed
```

## Running the Application

Development:

```bash
npm run dev
```

## API Routes

### Authentication

#### Register

- **POST** `/api/auth/register`
- Body:

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

#### Login

- **POST** `/api/auth/login`
- Body:

```json
{
  "email": "string",
  "password": "string"
}
```

#### Change Password

- **POST** `/api/auth/change-password`
- Body:

```json
{
  "userId": "string",
  "currentPassword": "string",
  "newPassword": "string"
}
```

### Transactions

#### Create Transaction

- **POST** `/api/transactions`

#### Get All Transactions

- **GET** `/api/transactions`

#### Update Transaction

- **PUT** `/api/transactions/:id`

#### Delete Transaction

- **DELETE** `/api/transactions/:id`

### Budgets

#### Create Budget

- **POST** `/api/budgets`

#### Get All Budgets

- **GET** `/api/budgets`

#### Update Budget

- **PUT** `/api/budgets/:id`

#### Delete Budget

- **DELETE** `/api/budgets/:id`

### Savings (Pots)

#### Create Pot

- **POST** `/api/pots`

#### Get All Pots

- **GET** `/api/pots`

#### Update Pot

- **PUT** `/api/pots/:id`

#### Update Pot Total

- **PATCH** `/api/pots/:id/total`

#### Delete Pot

- **DELETE** `/api/pots/:id`

### Recurring Bills

#### Create Recurring Bill

- **POST** `/api/recurring-bills`

#### Get All Recurring Bills

- **GET** `/api/recurring-bills`

#### Update Recurring Bill

- **PUT** `/api/recurring-bills/:id`

#### Delete Recurring Bill

- **DELETE** `/api/recurring-bills/:id`

## Security

- All passwords are hashed before storing in the database
- JWT tokens expire after 15 minutes
- CORS is configured for the frontend application
- All routes (except authentication) require a valid JWT token

## Database

The project uses PostgreSQL database with Prisma ORM. The schema can be found in `prisma/schema.prisma`.

## Project Structure

```
backend/
├── prisma/         # Database schema and migrations
├── routes/         # API routes
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── lib/            # Utilities and configurations
└── views/          # Static views (404, etc.)
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run start` - Start production server
- `npx prisma migrate dev` - Run database migrations
- `npx prisma db seed` - Seed the database
- `npx prisma studio` - Open Prisma Studio

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Request validation
- Error handling middleware
- 15-minute token expiration

## Deployment

The API is deployed on Vercel with automatic deployments on push to main branch.

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 3000)

