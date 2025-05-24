const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");

const usersController = {
    // Create new user
    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;

            // Check if user already exists
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                return res.status(400).json({ error: "User with this email already exists" });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            // Remove password from response
            const { password: _, ...userWithoutPassword } = user;
            res.status(201).json(userWithoutPassword);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                    transactions: true,
                    recurringBills: true,
                    budgets: true,
                    pots: true,
                    balance: true,
                },
            });
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get one user by ID
    async getUserById(req, res) {
        try {
            const user = await prisma.user.findUnique({
                where: { id: req.params.id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    transactions: true,
                    recurringBills: true,
                    budgets: {
                        orderBy: {
                            spending_limit: "desc",
                        },
                    },
                    pots: {
                        orderBy: {
                            target: "desc",
                        },
                    },
                    balance: true,
                },
            });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update user
    async updateUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const updateData = { name, email };

            // If password is changed, hash it
            if (password) {
                updateData.password = await bcrypt.hash(password, 10);
            }

            const user = await prisma.user.update({
                where: { id: parseInt(req.params.id) },
                data: updateData,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    transactions: true,
                    recurringBills: true,
                    budgets: true,
                    pots: true,
                },
            });

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete user
    async deleteUser(req, res) {
        try {
            await prisma.user.delete({
                where: { id: parseInt(req.params.id) },
            });
            res.json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Login user
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Find user
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            // Check password
            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            // Remove password from response
            const { password: _, ...userWithoutPassword } = user;
            res.json(userWithoutPassword);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = usersController;
