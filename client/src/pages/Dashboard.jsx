import { useEffect, useState } from "react";
import api from "../services/api.js";
import ExpenseChart from "../components/ExpenseChart.jsx";

const Dashboard = () => {
  const [summary, setSummary] = useState([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0 });

  useEffect(() => {
    const load = async () => {
      const [{ data: expSummary }, { data: incomes }, { data: expenses }] = await Promise.all([
        api.get("/expenses/summary"),
        api.get("/income"),
        api.get("/expenses"),
      ]);
      setSummary(expSummary);
      setTotals({
        income: incomes.reduce((s, i) => s + i.amount, 0),
        expense: expenses.reduce((s, e) => s + e.amount, 0),
      });
    };
    load();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-slate-500 text-sm">Total Income</p>
          <p className="text-2xl font-bold text-green-600">{totals.income}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-slate-500 text-sm">Total Expenses</p>
          <p className="text-2xl font-bold text-red-600">{totals.expense}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-slate-500 text-sm">Net Balance</p>
          <p className="text-2xl font-bold">{totals.income - totals.expense}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded shadow max-w-md">
        <h2 className="font-semibold mb-4">Spending by Category</h2>
        <ExpenseChart summary={summary} />
      </div>
    </div>
  );
};

export default Dashboard;
