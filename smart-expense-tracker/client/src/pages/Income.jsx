import { useEffect, useState } from "react";
import api from "../services/api.js";

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [form, setForm] = useState({ source: "", amount: "", date: "", notes: "" });

  const load = async () => {
    const { data } = await api.get("/income");
    setIncomes(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/income", { ...form, amount: Number(form.amount) });
    setForm({ source: "", amount: "", date: "", notes: "" });
    load();
  };

  const handleDelete = async (id) => {
    await api.delete(`/income/${id}`);
    load();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Income</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
        <input
          placeholder="Source"
          className="border p-2 rounded"
          value={form.source}
          onChange={(e) => setForm({ ...form, source: e.target.value })}
          required
        />
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
          Add Income
        </button>
      </form>

      <div className="bg-white rounded shadow divide-y">
        {incomes.map((i) => (
          <div key={i._id} className="flex justify-between items-center p-3">
            <div>
              <p className="font-medium">{i.source}</p>
              <p className="text-xs text-slate-500">{new Date(i.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-600 font-semibold">+{i.amount}</span>
              <button onClick={() => handleDelete(i._id)} className="text-red-500 text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
        {incomes.length === 0 && <p className="p-4 text-slate-500">No income recorded yet.</p>}
      </div>
    </div>
  );
};

export default Income;
