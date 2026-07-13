import Income from "../models/Income.js";

export const getIncomes = async (req, res) => {
  const incomes = await Income.find({ user: req.user._id }).sort({ date: -1 });
  res.json(incomes);
};

export const addIncome = async (req, res) => {
  try {
    const { source, amount, date, notes } = req.body;
    const income = await Income.create({ user: req.user._id, source, amount, date, notes });
    res.status(201).json(income);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateIncome = async (req, res) => {
  const income = await Income.findOne({ _id: req.params.id, user: req.user._id });
  if (!income) return res.status(404).json({ message: "Income not found" });

  Object.assign(income, req.body);
  await income.save();
  res.json(income);
};

export const deleteIncome = async (req, res) => {
  const income = await Income.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!income) return res.status(404).json({ message: "Income not found" });
  res.json({ message: "Income deleted" });
};
