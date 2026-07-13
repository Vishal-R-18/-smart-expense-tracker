import { useEffect, useState } from "react";
import api from "../services/api.js";

const CATEGORIES = ["Food", "Transport", "Housing", "Utilities", "Entertainment", "Health", "Shopping", "Education", "Other"];

const now = new Date();

const Budget = () => {
  const [status, setStatus] = useState([]);
  const [form, setForm] = useState({
    category: "Food",
    monthlyLimit: "",
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  });

  const load = async () => {
    const { data } = await api.get(`/budget/status?month=${form.month}&year=${form.year}`);
    setStatus(data);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.month, form.year]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/budget", { ...form, monthlyLimit: Number(form.monthlyLimit) });
    setForm({ ...form, monthlyLimit: "" });
    load();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Budget Planner</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
        <select
          className="border p-2 rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Monthly limit"
          className="border p-2 rounded"
          value={form.monthlyLimit}
          onChange={(e) => setForm({ ...form, monthlyLimit: e.target.value })}
          required
        />
        <input
          type="number"
          min="1"
          max="12"
          placeholder="Month"
          className="border p-2 rounded"
          value={form.month}
          onChange={(e) => setForm({ ...form, month: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Year"
          className="border p-2 rounded"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
        />
        <button className="col-span-2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Set Budget
        </button>
      </form>

      <div className="bg-white rounded shadow divide-y">
        {status.map((s) => (
          <div key={s.category} className="p-3">
            <div className="flex justify-between">
              <span className="font-medium">{s.category}</span>
              <span className={s.overBudget ? "text-red-600 font-semibold" : "text-green-600"}>
                {s.spent} / {s.monthlyLimit}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded h-2 mt-2">
              <div
                className={`h-2 rounded ${s.overBudget ? "bg-red-500" : "bg-indigo-500"}`}
                style={{ width: `${Math.min(100, (s.spent / s.monthlyLimit) * 100)}%` }}
              />
            </div>
            {s.overBudget && <p className="text-xs text-red-500 mt-1">Over budget!</p>}
          </div>
        ))}
        {status.length === 0 && <p className="p-4 text-slate-500">No budgets set for this month.</p>}
      </div>
    </div>
  );
};

export default Budget;
