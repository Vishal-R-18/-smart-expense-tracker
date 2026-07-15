import { useEffect, useState } from "react";
import api from "../services/api.js";

const CATEGORIES = ["Food","Transport","Housing","Utilities","Entertainment","Health","Shopping","Education","Other"];
const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
const now = new Date();

const Budget = () => {
  const [status, setStatus] = useState([]);
  const [form, setForm] = useState({ category:"Food", monthlyLimit:"", month: now.getMonth()+1, year: now.getFullYear() });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data } = await api.get(`/budget/status?month=${form.month}&year=${form.year}`);
    setStatus(data);
  };

  useEffect(() => { load(); }, [form.month, form.year]);

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    await api.post("/budget", { ...form, monthlyLimit: Number(form.monthlyLimit) });
    setForm(f => ({ ...f, monthlyLimit: "" }));
    await load(); setLoading(false);
  };

  return (
    <div>
      <h1 className="page-title">Budget Planner</h1>

      <div className="card" style={{marginBottom:"1.5rem"}}>
        <p style={{fontWeight:600,marginBottom:"1rem",fontSize:".875rem",color:"var(--text-2)"}}>SET MONTHLY BUDGET</p>
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
              <label className="form-label">Monthly Limit (₹)</label>
              <input type="number" className="form-input" placeholder="0" value={form.monthlyLimit}
                onChange={e => setForm({...form, monthlyLimit: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Month</label>
              <input type="number" className="form-input" min="1" max="12" value={form.month}
                onChange={e => setForm({...form, month: Number(e.target.value)})} />
            </div>
            <div className="form-group">
              <label className="form-label">Year</label>
              <input type="number" className="form-input" value={form.year}
                onChange={e => setForm({...form, year: Number(e.target.value)})} />
            </div>
            <button className="btn btn-primary btn-full" disabled={loading}>
              {loading ? "Saving..." : "Set Budget"}
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <p style={{fontWeight:600,marginBottom:"1.25rem",fontSize:".875rem",color:"var(--text-2)"}}>
          BUDGET STATUS — {form.month}/{form.year}
        </p>
        {status.length > 0 ? (
          <div style={{display:"flex",flexDirection:"column",gap:"1.25rem"}}>
            {status.map(s => {
              const pct = Math.min(100, Math.round((s.spent / s.monthlyLimit) * 100));
              const fillClass = pct >= 100 ? "progress-fill--danger" : pct >= 80 ? "progress-fill--warn" : "progress-fill--ok";
              return (
                <div key={s.category}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:".35rem"}}>
                    <span style={{fontWeight:600,fontSize:".875rem"}}>{s.category}</span>
                    <span style={{fontSize:".875rem",color: s.overBudget ? "var(--red)" : "var(--text-2)"}}>
                      {fmt(s.spent)} <span style={{color:"var(--text-3)"}}>/ {fmt(s.monthlyLimit)}</span>
                    </span>
                  </div>
                  <div className="progress-track">
                    <div className={`progress-fill ${fillClass}`} style={{width:`${pct}%`}} />
                  </div>
                  {s.overBudget && (
                    <p style={{fontSize:".75rem",color:"var(--red)",marginTop:".3rem",fontWeight:600}}>
                      Over budget by {fmt(s.spent - s.monthlyLimit)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty">No budgets set for this month.<br/>Add a budget above to start tracking.</div>
        )}
      </div>
    </div>
  );
};

export default Budget;