const prisma = require("../lib/prisma");

const transactionController = {
    // Create new transaction
    async createTransaction(req, res) {
        const { userId, name, amount, category, recurring, status } = req.body;
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const transaction = await prisma.transaction.create({
                data: {
                    userId,
                    name,
                    amount,
                    date: new Date(),
                    category,
                    recurring,
                    status,
                },
            });
            res.status(201).json(transaction);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get all transactions
    async getAllTransactions(req, res) {
        try {
            const transactions = await prisma.transaction.findMany({
                include: {
                    user: true,
                },
                orderBy: {
                    date: "desc",
                },
            });
            res.json(transactions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get one transaction by ID
    async getTransactionById(req, res) {
        try {
            const transaction = await prisma.transaction.findUnique({
                where: { id: req.params.id },
                include: {
                    user: true,
                },
            });
            if (!transaction) {
                return res.status(404).json({ error: "Transaction not found" });
            }
            res.json(transaction);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update transaction
    async updateTransaction(req, res) {
        try {
            const { userId, name, amount, category, recurring, status } = req.body;
            const transaction = await prisma.transaction.update({
                where: { id: req.params.id },
                data: {
                    userId,
                    name,
                    amount,
                    category,
                    recurring,
                    status,
                },
            });
            res.json(transaction);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete transaction
    async deleteTransaction(req, res) {
        try {
            await prisma.transaction.delete({
                where: { id: req.params.id },
            });
            res.json({ message: "Transaction deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get transactions by user ID
    async getTransactionsByUserId(req, res) {
        try {
            const transactions = await prisma.transaction.findMany({
                where: { userId: req.params.userId },
            }); 
            res.json(transactions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Sort by category name
    async sortByCategory(req, res) {
        try {
            const { category } = req.params;
            const transactions = await prisma.transaction.findMany({
                where: { category: category },
            });
            res.json(transactions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = transactionController;
