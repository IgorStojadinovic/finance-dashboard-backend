const express = require("express");
const router = express.Router();
const budgetsController = require("../controllers/budgetsController");

// All routes for budgets
router.get("/", budgetsController.getAllBudgets);
router.post("/", budgetsController.createBudget);
router.get("/user/:userId", budgetsController.getUserBudgets);
router.get(
  "/user/:userId/category/:category",
  budgetsController.getBudgetByCategory
);
router.get("/:id", budgetsController.getBudgetById);
router.put("/:id", budgetsController.updateBudget);
router.delete("/:id", budgetsController.deleteBudget);

module.exports = router;
