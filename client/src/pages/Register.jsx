import { useEffect, useState } from "react";
import api from "../services/api.js";

const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

const Insights = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/insights")
      .then(r => setData(r.data))
      .catch(e => setError(e.response?.data?.message || "Could not load insights"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="empty" style={{marginTop:"4rem"}}>Analyzing your spending patterns…</div>;
  if (error)   return <div className="alert alert-danger">{error}</div>;

  const trend = data.forecast?.trend;
  const trendClass = trend === "increasing" ? "trend-badge--up" : trend === "decreasing" ? "trend-badge--down" : "trend-badge--stable";
  const trendLabel = trend === "increasing" ? "↑ Rising" : trend === "decreasing" ? "↓ Falling" : "→ Stable";

  return (
    <div>
      <h1 className="page-title">AI Insights</h1>
      <p style={{color:"var(--text-3)",fontSize:".875rem",marginTop:"-.75rem",marginBottom:"1.5rem"}}>
        Statistical analysis of your spending — anomaly detection + next-month forecast
      </p>

      {data.message && (
        <div className="alert alert-info">{data.message}</div>
      )}

      {data.forecast && (
        <div className="card" style={{marginBottom:"1.5rem"}}>
          <p style={{fontWeight:600,marginBottom:"1rem",fontSize:".75rem",color:"var(--text-3)",textTransform:"uppercase",letterSpacing:".06em"}}>NEXT MONTH FORECAST</p>
          {data.forecast.trend === "insufficient_data" ? (
            <p style={{color:"var(--text-2)",fontSize:".875rem"}}>
              Only {data.forecast.monthsAnalyzed} month of data recorded. Add expenses across a second month to unlock trend-based forecasting.
              Current month estimate: <strong>{fmt(data.forecast.predictedNextMonthTotal)}</strong>
            </p>
          ) : (
            <div className="insight-forecast">
              <p className="forecast-amount">{fmt(data.forecast.predictedNextMonthTotal)}</p>
              <div>
                <span className={`trend-badge ${trendClass}`}>{trendLabel}</span>
                <p style={{fontSize:".75rem",color:"var(--text-3)",marginTop:".25rem"}}>based on {data.forecast.monthsAnalyzed} months</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="card">
        <p style={{fontWeight:600,marginBottom:"1rem",fontSize:".75rem",color:"var(--text-3)",textTransform:"uppercase",letterSpacing:".06em"}}>UNUSUAL SPENDING THIS MONTH</p>
        {data.anomalies?.length > 0 ? (
          <div style={{display:"flex",flexDirection:"column",gap:".75rem"}}>
            {data.anomalies.map(a => (
              <div key={a.category} className="alert alert-danger">
                <p style={{fontWeight:700,marginBottom:".2rem"}}>{a.category} — {fmt(a.currentSpend)}</p>
                <p style={{fontSize:".8rem"}}>{a.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty" style={{padding:"1.5rem 0"}}>
            Nothing unusual detected — your spending is consistent with past months.
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;
