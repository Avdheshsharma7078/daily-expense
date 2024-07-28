const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const { validateExpense } = require("../middlewares/validation");

router.post("/expenses", validateExpense, expenseController.addExpense);
router.get("/expenses/user/:userId", expenseController.getUserExpenses);
router.get("/expenses", expenseController.getAllExpenses);
router.get("/expenses/download", expenseController.downloadBalanceSheet);

module.exports = router;
