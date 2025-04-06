const express = require("express");
const path = require("path");
const prisma = require("./lib/prisma");
const transactionRoutes = require("./routes/transactionRoutes");
const userRoutes = require("./routes/userRoutes");
const potRoutes = require("./routes/potRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const recurringBillsRoutes = require("./routes/recurringBillsRoutes");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const app = express();

// Middleware
app.use(express.json());

const allowedOrigins = [
    "http://localhost:5174", // Vite development
    "http://localhost:5173", // Vite development
    "http://localhost:4174", // Vite preview
    "http://localhost:4173", // Vite preview
    "https://finance-dashboard-psi-sand.vercel.app", // Production
];

// Osnovna CORS konfiguracija
app.use(
    cors({
        origin: function (origin, callback) {
            // Tokom razvoja, dozvoljavamo sve origins
            if (process.env.NODE_ENV === "development") {
                return callback(null, true);
            }

            // U produkciji, proveravamo origin
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

// Testiranje konekcije sa bazom
async function testConnection() {
    try {
        await prisma.$queryRaw`SELECT 1`;
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

testConnection();

// Rute
app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pots", potRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/recurring-bills", recurringBillsRoutes);
app.use("/api/auth", authRoutes);
app.use("/", require("./routes/root"));

/* // Specifična CORS konfiguracija za određenu rutu
app.get(
    "/api/special-route",
    cors({
        origin: "http://special-domain.com",
    }),
    (req, res) => {
        // Route handler
    }
); */

// Rukovanje preflight requests-ima
app.options("*", cors());

// ILI za specifičnu rutu
//app.options("/api/special-route", cors());

// 404 handler
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ message: "404 Not Found" });
    } else {
        res.type("text").send("404 Not Found");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
