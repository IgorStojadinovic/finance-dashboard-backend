const prisma = require("../lib/prisma");

const potsController = {
    // Create new pot (savings)
    async createPot(req, res) {
        try {
            const { userId, name, target, total, theme } = req.body;

            // Check if user exists
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const pot = await prisma.pot.create({
                data: {
                    userId,
                    name,
                    target,
                    total,
                    theme,
                    progressBar: `${Math.min(100, Math.round((target / total) * 100))}%`,
                },
            });

            res.status(201).json(pot);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get all pots
    async getAllPots(req, res) {
        try {
            const pots = await prisma.pot.findMany({
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
            res.json(pots);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get all pots for user
    async getUserPots(req, res) {
        try {
            const { userId } = req.params;
            const pots = await prisma.pot.findMany({
                where: { userId: userId },
                orderBy: { id: "desc" },
            });
            res.json(pots);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get one pot by ID
    async getPotById(req, res) {
        try {
            const pot = await prisma.pot.findUnique({
                where: { id: req.params.id },
            });

            if (!pot) {
                return res.status(404).json({ error: "Pot not found" });
            }

            res.json(pot);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update pot
    async updatePot(req, res) {
        try {
            const { name, target, total, theme, hex } = req.body;
            const pot = await prisma.pot.update({
                where: { id: req.params.id },
                data: {
                    name,
                    target,
                    total,
                    theme,
                    hex,
                    progressBar: `${Math.min(100, Math.round((total / target) * 100))}%`,
                },
            });

            res.json(pot);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete pot
    async deletePot(req, res) {
        try {
            await prisma.pot.delete({
                where: { id: req.params.id },
            });
            res.json({ message: "Pot deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update pot total
    async updatePotTotal(req, res) {
        try {
            const { amount } = req.body;
            const pot = await prisma.pot.findUnique({
                where: { id: req.params.id },
            });

            if (!pot) {
                return res.status(404).json({ error: "Pot not found" });
            }

            const updatedPot = await prisma.pot.update({
                where: { id: parseInt(req.params.id) },
                data: {
                    total: pot.total + amount,
                },
            });

            res.json(updatedPot);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = potsController;
