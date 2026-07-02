const { PrismaNeon } = require("@prisma/adapter-neon");
const { PrismaClient } = require("@prisma/client");
const { neonConfig } = require("@neondatabase/serverless");
const ws = require("ws");

// Required for Node.js environment
neonConfig.webSocketConstructor = ws;

let prisma = null;

function getPrisma() {
  if (!prisma) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    const adapter = new PrismaNeon({ connectionString });
    prisma = new PrismaClient({ adapter });
  }
  return prisma;
}

module.exports = new Proxy(
  {},
  {
    get(target, prop) {
      return getPrisma()[prop];
    },
  }
);
