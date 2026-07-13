import Budget from "../models/Budget.js";
import Expense from "../models/Expense.js";

export const getBudgets = async (req, res) => {
  const { month, year } = req.query;
  const filter = { user: req.user._id };
  if (month) filter.month = Number(month);
  if (year) filter.year = Number(year);
  const budgets = await Budget.find(filter);
  res.json(budgets);
};

export const setBudget = async (req, res) => {
  try {
    const { category, monthlyLimit, month, year } = req.body;
    const budget = await Budget.findOneAndUpdate(
      { user: req.user._id, category, month, year },
      { monthlyLimit },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(201).json(budget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteBudget = async (req, res) => {
  const budget = await Budget.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!budget) return res.status(404).json({ message: "Budget not found" });
  res.json({ message: "Budget deleted" });
};

// Compares each budget's limit against actual spend for that month/category
export const getBudgetStatus = async (req, res) => {
  const { month, year } = req.query;
  if (!month || !year) return res.status(400).json({ message: "month and year are required" });

  const budgets = await Budget.find({ user: req.user._id, month: Number(month), year: Number(year) });

  const start = new Date(Number(year), Number(month) - 1, 1);
  const end = new Date(Number(year), Number(month), 0, 23, 59, 59);

  const spend = await Expense.aggregate([
    { $match: { user: req.user._id, date: { $gte: start, $lte: end } } },
    { $group: { _id: "$category", total: { $sum: "$amount" } } },
  ]);
  const spendMap = Object.fromEntries(spend.map((s) => [s._id, s.total]));

  const status = budgets.map((b) => ({
    category: b.category,
    monthlyLimit: b.monthlyLimit,
    spent: spendMap[b.category] || 0,
    remaining: b.monthlyLimit - (spendMap[b.category] || 0),
    overBudget: (spendMap[b.category] || 0) > b.monthlyLimit,
  }));

  res.json(status);
};
