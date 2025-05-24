const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

// All routes for transactions
router.post("/", transactionController.createTransaction);
router.get("/", transactionController.getAllTransactions);
router.get("/:id", transactionController.getTransactionById);
router.put("/:id", transactionController.updateTransaction);
router.delete("/:id", transactionController.deleteTransaction);
router.get("/user/:userId", transactionController.getTransactionsByUserId);
router.get("/category/:category", transactionController.sortByCategory);

module.exports = router;
