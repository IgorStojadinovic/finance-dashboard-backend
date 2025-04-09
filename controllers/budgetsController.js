const prisma = require("../lib/prisma");

const budgetsController = {
  // Create new budget
  async createBudget(req, res) {
    try {
      const { userId, category, maximum, theme } = req.body;

      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const budget = await prisma.budget.create({
        data: {
          userId,
          category,
          maximum,
          theme,
        },
      });

      res.status(201).json(budget);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all budgets
  async getAllBudgets(req, res) {
    try {
      const budgets = await prisma.budget.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { id: "desc" },
      });
      res.json(budgets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all budgets for user
  async getUserBudgets(req, res) {
    try {
      const { userId } = req.params;
      const budgets = await prisma.budget.findMany({
        where: { userId: userId },
        orderBy: { id: "desc" },
      });
      res.json(budgets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get one budget by ID
  async getBudgetById(req, res) {
    try {
      const budget = await prisma.budget.findUnique({
        where: { id: req.params.id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!budget) {
        return res.status(404).json({ error: "Budget not found" });
      }

      res.json(budget);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update budget
  async updateBudget(req, res) {
    try {
      const { category, maximum, theme } = req.body;
      const budget = await prisma.budget.update({
        where: { id: req.params.id },
        data: {
          category,
          maximum,
          theme,
        },
      });

      res.json(budget);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete budget
  async deleteBudget(req, res) {
    try {
      await prisma.budget.delete({
        where: { id: req.params.id },
      });
      res.json({ message: "Budget deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get budget by category for user
  async getBudgetByCategory(req, res) {
    try {
      const { userId, category } = req.params;
      const budget = await prisma.budget.findFirst({
        where: {
          userId: userId,
          category: category,
        },
      });

      if (!budget) {
        return res
          .status(404)
          .json({ error: "Budget not found for this category" });
      }

      res.json(budget);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = budgetsController;
