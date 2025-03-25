const express = require("express");
const router = express.Router();
const potsController = require("../controllers/potsController");

// All routes for pots
router.post("/", potsController.createPot);
router.get("/user/:userId", potsController.getUserPots);
router.get("/:id", potsController.getPotById);
router.put("/:id", potsController.updatePot);
router.delete("/:id", potsController.deletePot);
router.patch("/:id/total", potsController.updatePotTotal);

module.exports = router;
