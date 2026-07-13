import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#3b82f6", "#a855f7", "#ec4899", "#14b8a6", "#84cc16"];

const ExpenseChart = ({ summary }) => {
  if (!summary || summary.length === 0) {
    return <p className="text-slate-500">No expense data yet.</p>;
  }

  const data = {
    labels: summary.map((s) => s._id),
    datasets: [
      {
        data: summary.map((s) => s.total),
        backgroundColor: COLORS,
      },
    ],
  };

  return <Pie data={data} />;
};

export default ExpenseChart;
