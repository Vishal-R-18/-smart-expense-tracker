import { useEffect, useState } from "react";
import api from "../services/api.js";

const CATEGORIES = ["Food", "Transport", "Housing", "Utilities", "Entertainment", "Health", "Shopping", "Education", "Other"];

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ category: "Food", amount: "", date: "", notes: "" });

  const load = async () => {
    const { data } = await api.get("/expenses");
    setExpenses(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/expenses", { ...form, amount: Number(form.amount) });
    setForm({ category: "Food", amount: "", date: "", notes: "" });
    load();
  };

  const handleDelete = async (id) => {
    await api.delete(`/expenses/${id}`);
    load();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Expenses</h1>

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
          placeholder="Amount"
          className="border p-2 rounded"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          placeholder="Notes (optional)"
          className="border p-2 rounded"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <button className="col-span-2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Add Expense
        </button>
      </form>

      <div className="bg-white rounded shadow divide-y">
        {expenses.map((exp) => (
          <div key={exp._id} className="flex justify-between items-center p-3">
            <div>
              <p className="font-medium">{exp.category}</p>
              <p className="text-xs text-slate-500">{new Date(exp.date).toLocaleDateString()} {exp.notes && `· ${exp.notes}`}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-red-600 font-semibold">-{exp.amount}</span>
              <button onClick={() => handleDelete(exp._id)} className="text-red-500 text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
        {expenses.length === 0 && <p className="p-4 text-slate-500">No expenses recorded yet.</p>}
      </div>
    </div>
  );
};

export default Expenses;
