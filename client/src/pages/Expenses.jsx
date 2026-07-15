import { useEffect, useState } from "react";
import api from "../services/api.js";

const CATEGORIES = ["Food","Transport","Housing","Utilities","Entertainment","Health","Shopping","Education","Other"];
const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
const today = () => new Date().toISOString().slice(0,10);

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ category: "Food", amount: "", date: today(), notes: "" });
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data } = await api.get("/expenses");
    setExpenses(data);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    await api.post("/expenses", { ...form, amount: Number(form.amount) });
    setForm({ category: "Food", amount: "", date: today(), notes: "" });
    await load(); setLoading(false);
  };

  const handleDelete = async (id) => { await api.delete(`/expenses/${id}`); load(); };

  const filtered = filter === "All" ? expenses : expenses.filter(e => e.category === filter);
  const total = filtered.reduce((s, e) => s + e.amount, 0);

  return (
    <div>
      <h1 className="page-title">Expenses</h1>

      <div className="card" style={{marginBottom:"1.5rem"}}>
        <p style={{fontWeight:600,marginBottom:"1rem",fontSize:".875rem",color:"var(--text-2)"}}>ADD EXPENSE</p>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={form.category}
                onChange={e => setForm({...form, category: e.target.value})}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Amount (₹)</label>
              <input type="number" className="form-input" placeholder="0" value={form.amount}
                onChange={e => setForm({...form, amount: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input type="date" className="form-input" value={form.date}
                onChange={e => setForm({...form, date: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Notes (optional)</label>
              <input className="form-input" placeholder="Any notes..." value={form.notes}
                onChange={e => setForm({...form, notes: e.target.value})} />
            </div>
            <button className="btn btn-primary btn-full" disabled={loading}>
              {loading ? "Adding..." : "+ Add Expense"}
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem",flexWrap:"wrap",gap:".5rem"}}>
          <p style={{fontWeight:600,fontSize:".875rem",color:"var(--text-2)"}}>EXPENSE HISTORY</p>
          <div style={{display:"flex",alignItems:"center",gap:".75rem"}}>
            {total > 0 && <span style={{color:"var(--red)",fontWeight:700,fontSize:"1rem"}}>{fmt(total)}</span>}
            <select className="form-select" style={{padding:".35rem .6rem",fontSize:".8rem"}}
              value={filter} onChange={e => setFilter(e.target.value)}>
              <option>All</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        {filtered.length > 0 ? (
          <div className="list">
            {filtered.map(exp => (
              <div key={exp._id} className="list-item">
                <div style={{display:"flex",alignItems:"center",gap:".75rem"}}>
                  <span className="tag">{exp.category}</span>
                  <p className="list-item-sub" style={{marginTop:0}}>
                    {new Date(exp.date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}
                    {exp.notes && ` · ${exp.notes}`}
                  </p>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
                  <span className="amount-negative">−{fmt(exp.amount)}</span>
                  <button className="btn-ghost" onClick={() => handleDelete(exp._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">No expenses found.</div>
        )}
      </div>
    </div>
  );
};

export default Expenses;