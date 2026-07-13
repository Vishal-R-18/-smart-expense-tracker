import PDFDocument from "pdfkit";
import { Parser } from "json2csv";
import Expense from "../models/Expense.js";
import Income from "../models/Income.js";

export const exportCSV = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).lean();
    const fields = ["category", "amount", "date", "notes"];
    const parser = new Parser({ fields });
    const csv = parser.parse(expenses);

    res.header("Content-Type", "text/csv");
    res.attachment("expenses.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const exportPDF = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 }).lean();
    const incomes = await Income.find({ user: req.user._id }).lean();

    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);

    const doc = new PDFDocument({ margin: 40 });
    res.header("Content-Type", "application/pdf");
    res.attachment("report.pdf");
    doc.pipe(res);

    doc.fontSize(18).text("Expense Report", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Total Income: ${totalIncome}`);
    doc.text(`Total Expenses: ${totalExpense}`);
    doc.text(`Net Balance: ${totalIncome - totalExpense}`);
    doc.moveDown();

    doc.fontSize(14).text("Expenses", { underline: true });
    doc.moveDown(0.5);
    expenses.forEach((e) => {
      doc.fontSize(10).text(
        `${new Date(e.date).toLocaleDateString()}  |  ${e.category}  |  ${e.amount}  |  ${e.notes || ""}`
      );
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
