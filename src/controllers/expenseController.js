const Expense = require("../models/Expense");
const { Parser } = require("json2csv"); // Correctly import Parser

exports.addExpense = async (req, res) => {
  try {
    const { description, amount, splitMethod, participants, createdBy } =
      req.body;

    if (splitMethod === "percentage") {
      const totalPercentage = participants.reduce(
        (acc, participant) => acc + participant.percentage,
        0
      );
      if (totalPercentage !== 100) {
        return res.status(400).json({ error: "Total percentage must be 100%" });
      }
    }

    const expense = new Expense({
      description,
      amount,
      splitMethod,
      participants,
      createdBy,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      "participants.userId": req.params.userId,
    });
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.downloadBalanceSheet = async (req, res) => {
  try {
    const expenses = await Expense.find(); // Fetch all expenses

    // Define the fields to be included in the CSV
    const fields = ["description", "amount", "splitMethod", "participants"];
    const opts = { fields };
    const parser = new Parser(opts); // Create a new Parser instance
    const csv = parser.parse(expenses); // Convert JSON to CSV

    // Set headers for CSV download
    res.header("Content-Type", "text/csv");
    res.attachment("balance-sheet.csv");
    return res.send(csv);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
