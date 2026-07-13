import { useEffect, useState } from "react";
import api from "../services/api.js";

const Insights = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/insights");
        setData(data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load insights");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Analyzing your spending...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">AI Insights</h1>
      <p className="text-sm text-slate-500 mb-6">
        Statistical analysis of your spending patterns — anomaly detection and a next-month forecast.
      </p>

      {data.message && (
        <div className="bg-white p-6 rounded shadow text-slate-500">{data.message}</div>
      )}

      {data.forecast && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="font-semibold mb-2">Next Month Forecast</h2>
          {data.forecast.trend === "insufficient_data" ? (
            <p className="text-slate-500 text-sm">
              Only {data.forecast.monthsAnalyzed} month of data so far — add another month of
              expenses to unlock a trend-based forecast. For now, based on this month:{" "}
              <span className="font-semibold">₹{data.forecast.predictedNextMonthTotal}</span>
            </p>
          ) : (
            <>
              <p className="text-3xl font-bold text-indigo-600">
                ₹{data.forecast.predictedNextMonthTotal}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Predicted total spend next month, based on a linear trend across{" "}
                {data.forecast.monthsAnalyzed} months of history. Your spending trend is currently{" "}
                <span
                  className={
                    data.forecast.trend === "increasing"
                      ? "text-red-500 font-medium"
                      : data.forecast.trend === "decreasing"
                      ? "text-green-600 font-medium"
                      : "font-medium"
                  }
                >
                  {data.forecast.trend}
                </span>
                .
              </p>
            </>
          )}
        </div>
      )}

      {data.anomalies && data.anomalies.length > 0 && (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-semibold mb-4">Unusual Spending This Month</h2>
          <div className="space-y-3">
            {data.anomalies.map((a) => (
              <div key={a.category} className="border-l-4 border-red-400 bg-red-50 p-3 rounded">
                <p className="font-medium text-red-700">{a.category}</p>
                <p className="text-sm text-slate-600">{a.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.anomalies && data.anomalies.length === 0 && !data.message && (
        <div className="bg-white p-6 rounded shadow text-slate-500">
          Nothing unusual detected this month — your spending is consistent with your history.
        </div>
      )}
    </div>
  );
};

export default Insights;