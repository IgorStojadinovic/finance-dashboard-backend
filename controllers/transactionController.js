const prisma = require("../lib/prisma");

const transactionController = {
  // Create new transaction
  async createTransaction(req, res) {
    try {
      const transaction = await prisma.transaction.create({
        data: req.body,
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
        where: { id: parseInt(req.params.id) },
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
      const transaction = await prisma.transaction.update({
        where: { id: parseInt(req.params.id) },
        data: req.body,
        include: {
          user: true,
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
        where: { id: parseInt(req.params.id) },
      });
      res.json({ message: "Transaction deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = transactionController;
