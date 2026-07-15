import { useEffect, useState } from "react";
import api from "../services/api.js";

const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
const today = () => new Date().toISOString().slice(0,10);

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [form, setForm] = useState({ source: "", amount: "", date: today(), notes: "" });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data } = await api.get("/income");
    setIncomes(data);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    await api.post("/income", { ...form, amount: Number(form.amount) });
    setForm({ source: "", amount: "", date: today(), notes: "" });
    await load(); setLoading(false);
  };

  const handleDelete = async (id) => { await api.delete(`/income/${id}`); load(); };

  const total = incomes.reduce((s, i) => s + i.amount, 0);

  return (
    <div>
      <h1 className="page-title">Income</h1>

      <div className="card" style={{marginBottom:"1.5rem"}}>
        <p style={{fontWeight:600,marginBottom:"1rem",fontSize:".875rem",color:"var(--text-2)"}}>ADD INCOME</p>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Source</label>
              <input className="form-input" placeholder="e.g. Salary, Freelance" value={form.source}
                onChange={e => setForm({...form, source: e.target.value})} required />
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
              {loading ? "Adding..." : "+ Add Income"}
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}>
          <p style={{fontWeight:600,fontSize:".875rem",color:"var(--text-2)"}}>INCOME HISTORY</p>
          {incomes.length > 0 && <span style={{color:"var(--emerald)",fontWeight:700,fontSize:"1rem"}}>Total: {fmt(total)}</span>}
        </div>
        {incomes.length > 0 ? (
          <div className="list">
            {incomes.map(i => (
              <div key={i._id} className="list-item">
                <div>
                  <p className="list-item-title">{i.source}</p>
                  <p className="list-item-sub">{new Date(i.date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})} {i.notes && `· ${i.notes}`}</p>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
                  <span className="amount-positive">+{fmt(i.amount)}</span>
                  <button className="btn-ghost" onClick={() => handleDelete(i._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">No income recorded yet.<br/>Add your first income entry above.</div>
        )}
      </div>
    </div>
  );
};

export default Income;
