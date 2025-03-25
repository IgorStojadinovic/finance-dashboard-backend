const express = require("express");
const router = express.Router();
const recurringBillsController = require("../controllers/recurringBillsController");

// All routes for recurring bills
router.get("/", recurringBillsController.getAllRecurringBills);
router.post("/", recurringBillsController.createRecurringBill);
router.get("/user/:userId", recurringBillsController.getUserRecurringBills);
router.get(
  "/user/:userId/status/:status",
  recurringBillsController.getRecurringBillsByStatus
);
router.get(
  "/user/:userId/month/:year/:month",
  recurringBillsController.getRecurringBillsByMonth
);
router.get("/:id", recurringBillsController.getRecurringBillById);
router.put("/:id", recurringBillsController.updateRecurringBill);
router.delete("/:id", recurringBillsController.deleteRecurringBill);

module.exports = router;
