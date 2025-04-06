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
            email: "Test_user@gmail.com",
            password: password2,
        },
    });

    // Dodaj transakcije za TestUser
    await prisma.transaction.createMany({
        data: [
            {
                userId: user2.id,
                name: "Groceries",
                amount: 50.75,
                date: new Date("2023-10-01"),
                category: "Food",
                recurring: false,
                status: "completed",
            },
            {
                userId: user2.id,
                name: "Rent",
                amount: 1200.0,
                date: new Date("2023-10-02"),
                category: "Housing",
                recurring: true,
                status: "completed",
            },
            {
                userId: user2.id,
                name: "Gym Membership",
                amount: 35.0,
                date: new Date("2023-10-03"),
                category: "Health",
                recurring: true,
                status: "pending",
            },
            // ... dodaj još 17 transakcija sa jedinstvenim podacima ...
        ],
    });

    // Dodaj potove za TestUser
    await prisma.pot.createMany({
        data: [
            { userId: user2.id, name: "Vacation Fund", target: 2000.0, total: 500.0, theme: "Travel" },
            { userId: user2.id, name: "Emergency Fund", target: 5000.0, total: 1500.0, theme: "Safety" },
            { userId: user2.id, name: "New Car", target: 15000.0, total: 3000.0, theme: "Automobile" },
            { userId: user2.id, name: "Home Renovation", target: 10000.0, total: 2500.0, theme: "Home" },
        ],
    });

    // Dodaj budžete za TestUser
    await prisma.budget.createMany({
        data: [
            { userId: user2.id, category: "Food", maximum: 300.0, theme: "Essentials" },
            { userId: user2.id, category: "Entertainment", maximum: 150.0, theme: "Leisure" },
            { userId: user2.id, category: "Utilities", maximum: 200.0, theme: "Essentials" },
            { userId: user2.id, category: "Transport", maximum: 100.0, theme: "Essentials" },
            { userId: user2.id, category: "Savings", maximum: 500.0, theme: "Future" },
        ],
    });

    // Dodaj ponavljajuće račune za TestUser
    await prisma.recurringBill.createMany({
        data: [
            {
                userId: user2.id,
                name: "Netflix Subscription",
                amount: "15.99",
                orderDate: "2023-10-05",
                status: "active",
                date: new Date("2023-10-05"),
            },
            {
                userId: user2.id,
                name: "Spotify Subscription",
                amount: "9.99",
                orderDate: "2023-10-06",
                status: "active",
                date: new Date("2023-10-06"),
            },
            {
                userId: user2.id,
                name: "Internet Bill",
                amount: "45.00",
                orderDate: "2023-10-07",
                status: "active",
                date: new Date("2023-10-07"),
            },
            {
                userId: user2.id,
                name: "Water Bill",
                amount: "30.00",
                orderDate: "2023-10-08",
                status: "active",
                date: new Date("2023-10-08"),
            },
            {
                userId: user2.id,
                name: "Electricity Bill",
                amount: "60.00",
                orderDate: "2023-10-09",
                status: "active",
                date: new Date("2023-10-09"),
            },
        ],
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
