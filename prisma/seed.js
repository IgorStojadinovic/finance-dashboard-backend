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

    // Kreiraj TestUser korisnika
    const password2 = await bcrypt.hash("JohnDoe84266+", 10);
    const user2 = await prisma.user.create({
        data: {
            name: "TestUser",
            email: "Testuser@gmail.com",
            password: password2,
        },
    });

    // Dodaj transakcije za TestUser
    await prisma.transaction.createMany({
        data: [
            {
                userId: user2.id,
                name: "Emma Richardson",
                amount: 50.75,
                date: new Date("2025-01-05"),
                category: "Groceries",
                recurring: false,
                status: "completed",
                image: "/assets/avatars/emma-richardson.jpg",
            },
            {
                userId: user2.id,
                name: "Savory Bites Bristo",
                amount: 1200.0,
                date: new Date("2025-02-10"),
                category: "Dining out",
                recurring: true,
                status: "completed",
                image: "/assets/avatars/savory-bites-bistro.jpg",
            },
            {
                userId: user2.id,
                name: "Daniel Carter",
                amount: 35.0,
                date: new Date("2025-03-15"),
                category: "Lifestyle",
                recurring: true,
                status: "pending",
                image: "/assets/avatars/daniel-carter.jpg",
            },
            {
                userId: user2.id,
                name: "Sun Park",
                amount: 10,
                date: new Date("2025-04-20"),
                category: "Transportation",
                recurring: false,
                status: "completed",
                image: "/assets/avatars/sun-park.jpg",
            },
            {
                userId: user2.id,
                name: "Urban Service",
                amount: 10,
                date: new Date("2025-05-25"),
                category: "Transportation",
                recurring: false,
                status: "completed",
                image: "/assets/avatars/urban-services-hub.jpg",
            },
            {
                userId: user2.id,
                name: "Aqua Flow Utility",
                amount: 10,
                date: new Date("2025-06-30"),
                category: "General",
                recurring: false,
                status: "completed",
                image: "/assets/avatars/aqua-flow-utilities.jpg",
            },
            {
                userId: user2.id,
                name: "Buzz Marketing",
                amount: 2569,
                date: new Date("2025-07-05"),
                category: "Entertainment",
                recurring: false,
                status: "completed",
                image: "/assets/avatars/buzz-marketing-group.jpg",
            },
            {
                userId: user2.id,
                name: "Bytewise",
                amount: 56,
                date: new Date("2025-08-10"),
                category: "Entertainment",
                recurring: false,
                status: "completed",
                image: "/assets/avatars/bytewise.jpg",
            },
            {
                userId: user2.id,
                name: "Eco-Fuel Energy",
                amount: 450,
                date: new Date("2025-09-15"),
                category: "Utilities",
                recurring: false,
                status: "completed",
                image: "/assets/avatars/ecofuel-energy.jpg",
            },
            {
                userId: user2.id,
                name: "Elevate education",
                amount: 25,
                date: new Date("2025-10-20"),
                category: "Education",
                recurring: false,
                status: "completed",
                image: "/assets/avatars/elevate-education.jpg",
            },
            {
                userId: user2.id,
                name: "Ella Phillips",
                amount: 54,
                date: new Date("2025-11-25"),
                category: "Entertainment",
                recurring: false,
                status: "completed",
                image: "/assets/avatars/ella-phillips.jpg",
            },
            {
                userId: user2.id,
                name: "Ethan Clark",
                amount: 10,
                date: new Date("2025-12-30"),
                category: "Groceries",
                recurring: false,
                status: "completed",
                image: "/assets/avatars/ethan-clark.jpg",
            },
            {
                userId: user2.id,
                name: "Flavor Fiesta",
                amount: 110,
                date: new Date("2025-01-05"),
                category: "Groceries",
                recurring: false,
                status: "completed",
                image: "/assets/avatars/flavor-fiesta.jpg",
            },
            {
                userId: user2.id,
                name: "Green plate eatery",
                amount: 10,
                date: new Date("2025-02-10"),
                category: "Dining out",
                recurring: false,
                status: "completed",
                image: "/assets/avatars/green-plate-eatery.jpg",
            },
            {
                userId: user2.id,
                name: "Harper Edwards",
                amount: 65,
                date: new Date("2025-03-15"),
                category: "Personal care",
                recurring: false,
                status: "completed",
                image: "/assets/avatars/harper-edwards.jpg",
            },
            {
                userId: user2.id,
                name: "James Thompson",
                amount: 35,
                date: new Date("2025-04-20"),
                category: "Transportation",
                recurring: false,
                status: "completed",
                image: "/assets/avatars/james-thompson.jpg",
            },
            {
                userId: user2.id,
                name: "Liam Hughes",
                amount: 45,
                date: new Date("2025-05-25"),
                category: "Shopping",
                recurring: false,
                status: "completed",
                image: "/assets/avatars/liam-hughes.jpg",
            },
            {
                userId: user2.id,
                name: "Delta Taxi",
                amount: 10,
                date: new Date("2025-06-30"),
                category: "Transportation",
                recurring: false,
                status: "completed",
                image: "/assets/avatars/swift-ride-share.jpg",
            },
            {
                userId: user2.id,
                name: "Delta Taxi",
                amount: 25,
                date: new Date("2025-07-05"),
                category: "Transportation",
                recurring: false,
                status: "completed",
                image: "/assets/avatars/swift-ride-share.jpg",
            },
            {
                userId: user2.id,
                name: "Delta Taxi",
                amount: 5,
                date: new Date("2025-08-10"),
                category: "Transportation",
                recurring: false,
                status: "completed",
                image: "/assets/avatars/swift-ride-share.jpg",
            },

            {
                userId: user2.id,
                name: "Delta Taxi",
                amount: 15,
                date: new Date("2025-09-15"),
                category: "Transportation",
                recurring: false,
                status: "completed",
                image: "/assets/avatars/swift-ride-share.jpg",
            },
            {
                userId: user2.id,
                name: "Delta Taxi",
                amount: 5,
                date: new Date("2025-10-20"),
                category: "Transportation",
                recurring: false,
                status: "completed",
                image: "/assets/avatars/swift-ride-share.jpg",
            },
        ],
    });

    // Dodaj potove za TestUser
    await prisma.pot.createMany({
        data: [
            {
                userId: user2.id,
                name: "Vacation Fund",
                target: 2000.0,
                total: 500.0,
                hex: "#277C78",
                theme: "green",
                progressBar: `${Math.min(100, (500.0 / 2000.0) * 100)}%`,
            },
            {
                userId: user2.id,
                name: "Emergency Fund",
                target: 5000.0,
                total: 1500.0,
                hex: "#626070",
                theme: "navy",
                progressBar: `${Math.min(100, (1500.0 / 5000.0) * 100)}%`,
            },
            {
                userId: user2.id,
                name: "New Car",
                target: 15000.0,
                total: 3000.0,
                hex: "#3F82B2",
                theme: "blue",
                progressBar: `${Math.min(100, (3000.0 / 15000.0) * 100)}%`,
            },
            {
                userId: user2.id,
                name: "Home Renovation",
                target: 10000.0,
                total: 2500.0,
                hex: "#F2CDAC",
                theme: "yellow",
                progressBar: `${Math.min(100, (2500.0 / 10000.0) * 100)}%`,
            },
        ],
    });

    // Dodaj budžete za TestUser
    await prisma.budget.createMany({
        data: [
            {
                userId: user2.id,
                category: "Food",
                spent: 300.0,
                theme: "yellow",
                hex: "#F2CDAC",
                spending_limit: 350.0,
                progressBar: `${(300.0 / 350.0) * 100}%`,
                latest_spending: [
                    {
                        name: "Grocery Store",
                        amount: 100.0,
                        date: new Date("2025-01-10"),
                        category: "Food",
                        recurring: false,
                        status: "completed",
                        image: "/assets/avatars/aqua-flow-utilities.jpg",
                    },
                    {
                        name: "Restaurant Dinner",
                        amount: 150.0,
                        date: new Date("2025-01-15"),
                        category: "Food",
                        recurring: false,
                        status: "completed",
                        image: "/assets/avatars/flavor-fiesta.jpg",
                    },
                    {
                        name: "Coffee Shop",
                        amount: 50,
                        date: new Date("2025-01-20"),
                        category: "Food",
                        recurring: false,
                        status: "completed",
                        image: "/assets/avatars/spark-electric-solutions.jpg",
                    },
                ],
            },
            {
                userId: user2.id,
                category: "Entertainment",
                spent: 150.0,
                theme: "green",
                hex: "#277C78",
                spending_limit: 190.0,
                progressBar: `${(150.0 / 190.0) * 100}%`,
                latest_spending: [
                    {
                        name: "Movie Night",
                        amount: 50,
                        date: new Date("2025-02-15"),
                        category: "Entertainment",
                        recurring: false,
                        status: "completed",
                        image: "/assets/avatars/bytewise.jpg",
                    },
                    {
                        name: "Concert",
                        amount: 90,
                        date: new Date("2025-02-20"),
                        category: "Entertainment",
                        recurring: false,
                        status: "completed",
                        image: "/assets/avatars/bytewise.jpg",
                    },
                    {
                        name: "Coffee Shop",
                        amount: 10,
                        date: new Date("2025-02-25"),
                        category: "Entertainment    ",
                        recurring: false,
                        status: "completed",
                        image: "/assets/avatars/bytewise.jpg",
                    },
                ],
            },
            {
                userId: user2.id,
                category: "Utilities",
                spent: 200.0,
                theme: "navy",
                hex: "#626070",
                spending_limit: 280.0,
                progressBar: `${(200.0 / 280.0) * 100}%`,
                latest_spending: [
                    {
                        name: "Electricity Bill",
                        amount: 50,
                        date: new Date("2025-03-15"),
                        category: "Utilities",
                        recurring: false,
                        status: "completed",
                        image: "/assets/avatars/aqua-flow-utilities.jpg",
                    },
                    {
                        name: "Water Bill",
                        amount: 50,
                        date: new Date("2025-03-20"),
                        category: "Utilities",
                        recurring: false,
                        status: "completed",
                        image: "/assets/avatars/aqua-flow-utilities.jpg",
                    },
                    {
                        name: "Electricity Bill",
                        amount: 100,
                        date: new Date("2025-03-25"),
                        category: "Utilities",
                        recurring: false,
                        status: "completed",
                        image: "/assets/avatars/aqua-flow-utilities.jpg",
                    },
                ],
            },
            {
                userId: user2.id,
                category: "Transport",
                spent: 75.0,
                theme: "brown",
                hex: "#93674F",
                spending_limit: 150.0,
                progressBar: `${(75.0 / 150.0) * 100}%`,
                latest_spending: [
                    {
                        name: "Taxi Ride",
                        amount: 25.0,
                        date: new Date("2025-04-25"),
                        category: "Transport",
                        recurring: false,
                        status: "completed",
                        image: "/assets/avatars/ecofuel-energy.jpg",
                    },
                    {
                        name: "Delta Taxi",
                        amount: 25.0,
                        date: new Date("2025-04-25"),
                        category: "Transport",
                        recurring: false,
                        status: "completed",
                        image: "/assets/avatars/swift-ride-share.jpg",
                    },
                    {
                        name: "Delta Taxi",
                        amount: 25.0,
                        date: new Date("2025-04-25"),
                        category: "Transport",
                        recurring: false,
                        status: "completed",
                        image: "/assets/avatars/swift-ride-share.jpg",
                    },
                ],
            },
            {
                userId: user2.id,
                category: "Savings",
                spent: 500.0,
                theme: "cayan",
                hex: "#82C9D7",
                spending_limit: 600.0,
                progressBar: `${(500 / 600) * 100}%`,
                latest_spending: [
                    {
                        name: "Saving for a new car",
                        amount: 500.0,
                        date: new Date("2025-02-10"),
                        category: "Savings",
                        recurring: false,
                        status: "completed",
                        image: "/assets/avatars/nimbus-data-storage.jpg",
                    },
                ],
            },
        ],
    });

    // Dodaj ponavljajuće račune za TestUser
    await prisma.recurringBill.createMany({
        data: [
            {
                userId: user2.id,
                name: "Netflix Subscription",
                category: "Entertainment",
                amount: 15.99,
                orderDate: new Date("2025-01-05"),
                status: "active",
                date: new Date("2025-01-05"),
                color: "#82C9D7",
            },
            {
                userId: user2.id,
                name: "Saving for a new car",
                category: "Savings",
                amount: 1000.0,
                orderDate: new Date("2025-02-10"),
                status: "active",
                date: new Date("2025-02-10"),
                color: "#277C78",
            },
            {
                userId: user2.id,
                name: "Internet Bill",
                category: "Utilities",
                amount: 45.0,
                orderDate: new Date("2025-03-15"),
                status: "active",
                date: new Date("2025-03-15"),
                color: "#626070",
            },
            {
                userId: user2.id,
                name: "Spotify Subscription",
                category: "Entertainment",
                amount: 9.99,
                orderDate: new Date("2025-04-20"),
                status: "active",
                date: new Date("2025-04-20"),
                color: "#277C78",
            },
            {
                userId: user2.id,
                name: "Water Bill",
                category: "Utilities",
                amount: 30.0,
                orderDate: new Date("2025-05-25"),
                status: "active",
                date: new Date("2025-05-25"),
                color: "#626070",
            },
            {
                userId: user2.id,
                name: "Electricity Bill",
                category: "Utilities",
                amount: 60.0,
                orderDate: new Date("2025-06-30"),
                status: "active",
                date: new Date("2025-06-30"),
                color: "#626070",
            },
        ],
    });

    const result = await prisma.$queryRaw`
    SELECT COALESCE(SUM(amount), 0) as total_expenses
    FROM (
      SELECT amount FROM "Transaction" WHERE "userId" = ${user2.id}
      UNION ALL
      SELECT amount FROM "RecurringBill" WHERE "userId" = ${user2.id}
    ) combined_expenses
  `;

    const totalExpenses = result[0]?.total_expenses || 0;
    // Dodaj balance za TestUser
    await prisma.balance.create({
        data: {
            userId: user2.id,
            balance: 8505.0,
            income: 2590.0,
            expenses: totalExpenses,
        },
    });

    console.log("Seed completed with TestUser!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
