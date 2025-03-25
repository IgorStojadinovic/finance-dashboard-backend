const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Prvo kreiraj korisnika bez relacija
  const password1 = await bcrypt.hash("admin", 10);
  const user1 = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password: password1,
    },
  });

  // Zatim dodaj transakcije
  await prisma.transaction.createMany({
    data: [
      {
        userId: user1.id,
        amount: 2500,
        type: "INCOME",
        category: "GENERAL",
        description: "Monthly salary",
        date: new Date(),
      },
      {
        userId: user1.id,
        amount: -45,
        type: "EXPENSE",
        category: "ENTERTAINMENT",
        description: "Cinema tickets",
        date: new Date(),
      },
      {
        userId: user1.id,
        amount: -120,
        type: "EXPENSE",
        category: "GROCERIES",
        description: "Monthly groceries",
        date: new Date(),
      },
      {
        userId: user1.id,
        amount: -35,
        type: "EXPENSE",
        category: "DINING_OUT",
        description: "Restaurant dinner",
        date: new Date(),
      },
      {
        userId: user1.id,
        amount: -25,
        type: "EXPENSE",
        category: "TRANSPORTATION",
        description: "Taxi ride",
        date: new Date(),
      },
    ],
  });

  // Dodaj potove
  await prisma.pot.createMany({
    data: [
      {
        userId: user1.id,
        name: "Vacation Fund",
        total: 500,
      },
      {
        userId: user1.id,
        name: "Emergency Fund",
        total: 1000,
      },
    ],
  });

  // Dodaj budžete
  await prisma.budget.createMany({
    data: [
      {
        userId: user1.id,
        category: "Food",
        amount: 300,
        period: "monthly",
      },
      {
        userId: user1.id,
        category: "Entertainment",
        amount: 200,
        period: "monthly",
      },
      {
        userId: user1.id,
        category: "Health",
        amount: 100,
        period: "monthly",
      },
      {
        userId: user1.id,
        category: "Housing",
        amount: 1000,
        period: "monthly",
      },
    ],
  });

  // Dodaj ponavljajuće račune
  await prisma.recurringBill.createMany({
    data: [
      {
        userId: user1.id,
        name: "Netflix",
        amount: 15,
        category: "Entertainment",
        frequency: "monthly",
        status: "active",
        nextDueDate: new Date(),
      },
      {
        userId: user1.id,
        name: "Gym",
        amount: 30,
        category: "Health",
        frequency: "monthly",
        status: "active",
        nextDueDate: new Date(),
      },
    ],
  });

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
