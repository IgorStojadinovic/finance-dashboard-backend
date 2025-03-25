const prisma = require("../lib/prisma");

const recurringBillsController = {
  // Create new recurring bill
  async createRecurringBill(req, res) {
    try {
      const { userId, name, amount, orderDate, status, date } = req.body;

      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const recurringBill = await prisma.recurringBill.create({
        data: {
          userId,
          name,
          amount,
          orderDate,
          status,
          date,
        },
      });

      res.status(201).json(recurringBill);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all recurring bills
  async getAllRecurringBills(req, res) {
    try {
      const recurringBills = await prisma.recurringBill.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { date: "desc" },
      });
      res.json(recurringBills);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all recurring bills for user
  async getUserRecurringBills(req, res) {
    try {
      const { userId } = req.params;
      const recurringBills = await prisma.recurringBill.findMany({
        where: { userId: parseInt(userId) },
        orderBy: { date: "desc" },
      });
      res.json(recurringBills);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get one recurring bill by ID
  async getRecurringBillById(req, res) {
    try {
      const recurringBill = await prisma.recurringBill.findUnique({
        where: { id: parseInt(req.params.id) },
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

      if (!recurringBill) {
        return res.status(404).json({ error: "Recurring bill not found" });
      }

      res.json(recurringBill);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update recurring bill
  async updateRecurringBill(req, res) {
    try {
      const { name, amount, orderDate, status, date } = req.body;
      const recurringBill = await prisma.recurringBill.update({
        where: { id: parseInt(req.params.id) },
        data: {
          name,
          amount,
          orderDate,
          status,
          date,
        },
      });

      res.json(recurringBill);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete recurring bill
  async deleteRecurringBill(req, res) {
    try {
      await prisma.recurringBill.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.json({ message: "Recurring bill deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get recurring bills by status for user
  async getRecurringBillsByStatus(req, res) {
    try {
      const { userId, status } = req.params;
      const recurringBills = await prisma.recurringBill.findMany({
        where: {
          userId: parseInt(userId),
          status: status,
        },
        orderBy: { date: "desc" },
      });

      res.json(recurringBills);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get recurring bills for specific month
  async getRecurringBillsByMonth(req, res) {
    try {
      const { userId, year, month } = req.params;
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month), 0);

      const recurringBills = await prisma.recurringBill.findMany({
        where: {
          userId: parseInt(userId),
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: { date: "asc" },
      });

      res.json(recurringBills);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = recurringBillsController;
