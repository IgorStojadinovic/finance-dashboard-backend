# Finance Dashboard Backend

Backend service for the Finance Dashboard application, built with Node.js, Express.js framework, and Prisma ORM.

## Technologies

- Node.js
- Express.js
- Prisma (ORM)
- PostgreSQL
- JWT for authentication
- bcrypt for password hashing

## Prerequisites

- Node.js (v14 or newer)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/finance_dashboard"
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
