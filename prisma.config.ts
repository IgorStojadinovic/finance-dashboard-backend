// prisma.config.ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

// prisma generate only loads this file; it does not connect.
// Migrations use the direct URL. The running app uses DATABASE_URL.
const databaseUrl =
  process.env.DIRECT_URL ??
  process.env.DATABASE_URL ??
  "postgresql://postgres:postgres@localhost:5432/finance_dashboard";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "node prisma/seed.js",
  },
  datasource: {
    url: databaseUrl,
  },
});
