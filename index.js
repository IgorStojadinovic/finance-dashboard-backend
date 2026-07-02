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
    "https://finance-dashboard-psi-sand.vercel.app/",
    "https://finance-dashboard-psi-sand.vercel.app",
    "https://finance-dashboard-psi-sand.vercel.app/api",
];

// Basic CORS configuration
app.use(
    cors({
        origin: function (origin, callback) {
            // During development, allow all origins
            if (process.env.NODE_ENV === "development") {
                return callback(null, true);
            }

            // In production, check origin
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

// Test connection only in development (not in serverless)
if (process.env.NODE_ENV === 'development') {
    prisma.$queryRaw`SELECT 1`
        .then(() => console.log("Database connection successful"))
        .catch((error) => console.error("Database connection failed:", error));
}
app.use(express.static(path.join(__dirname, "public")));
// Rute
app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pots", potRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/recurring-bills", recurringBillsRoutes);
app.use("/api/auth", authRoutes);
app.use("/", require("./routes/root"));

// Preflight requests
app.options("*", cors());

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

// Only start server locally (not in Vercel serverless)
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
