import Expense from "../models/Expense.js";

export const getExpenses = async (req, res) => {
  const { category, from, to } = req.query;
  const filter = { user: req.user._id };
  if (category) filter.category = category;
  if (from || to) {
    filter.date = {};
    if (from) filter.date.$gte = new Date(from);
    if (to) filter.date.$lte = new Date(to);
  }
  const expenses = await Expense.find(filter).sort({ date: -1 });
  res.json(expenses);
};

export const addExpense = async (req, res) => {
  try {
    const { category, amount, date, notes } = req.body;
    const expense = await Expense.create({ user: req.user._id, category, amount, date, notes });
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateExpense = async (req, res) => {
  const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });
  if (!expense) return res.status(404).json({ message: "Expense not found" });

  Object.assign(expense, req.body);
  await expense.save();
  res.json(expense);
};

export const deleteExpense = async (req, res) => {
  const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!expense) return res.status(404).json({ message: "Expense not found" });
  res.json({ message: "Expense deleted" });
};

export const getExpenseSummary = async (req, res) => {
  const summary = await Expense.aggregate([
    { $match: { user: req.user._id } },
    { $group: { _id: "$category", total: { $sum: "$amount" } } },
    { $sort: { total: -1 } },
  ]);
  res.json(summary);
};
