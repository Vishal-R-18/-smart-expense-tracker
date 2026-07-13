import Expense from "../models/Expense.js";
import { mean, stdDev, linearRegression, predict } from "../utils/stats.js";

const monthKey = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

// Groups a user's expenses into { "2026-05": { Food: 1200, Transport: 300, _total: 1500 }, ... }
const buildMonthlyBreakdown = (expenses) => {
  const monthly = {};
  for (const exp of expenses) {
    const key = monthKey(exp.date);
    if (!monthly[key]) monthly[key] = { _total: 0 };
    monthly[key][exp.category] = (monthly[key][exp.category] || 0) + exp.amount;
    monthly[key]._total += exp.amount;
  }
  return monthly;
};

/**
 * GET /api/insights
 *
 * Returns two things, both computed with plain statistics (no black-box model),
 * so every number here can be explained and reproduced by hand:
 *
 * 1. anomalies: categories where the CURRENT month's spend is more than
 *    (historical average + 1.5 * standard deviation) of that category's
 *    spend in PRIOR months. This is a standard outlier-detection rule
 *    (similar to how monitoring/alerting systems flag unusual metrics).
 *
 * 2. forecast: next month's total spend, predicted via simple linear
 *    regression (least squares) over the user's monthly total spend history.
 *    Requires at least 2 months of data to produce a meaningful trend;
 *    with only 1 month of data it falls back to that month's total.
 */
export const getInsights = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).lean();

    if (expenses.length === 0) {
      return res.json({
        anomalies: [],
        forecast: null,
        message: "Not enough data yet. Add some expenses to unlock insights.",
      });
    }

    const monthly = buildMonthlyBreakdown(expenses);
    const sortedMonthKeys = Object.keys(monthly).sort(); // chronological, "YYYY-MM" sorts correctly as a string
    const currentMonthKey = sortedMonthKeys[sortedMonthKeys.length - 1];
    const priorMonthKeys = sortedMonthKeys.slice(0, -1);

    // ---- 1. Anomaly detection (per category) ----
    const currentMonthData = monthly[currentMonthKey];
    const categories = Object.keys(currentMonthData).filter((k) => k !== "_total");

    const anomalies = [];
    for (const category of categories) {
      const currentSpend = currentMonthData[category];

      const historicalSpends = priorMonthKeys.map((k) => monthly[k][category] || 0);
      if (historicalSpends.length === 0) continue; // no history to compare against yet

      const avg = mean(historicalSpends);
      const sd = stdDev(historicalSpends);
      const threshold = avg + 1.5 * sd;

      if (avg > 0 && currentSpend > threshold && currentSpend > avg * 1.2) {
        const percentIncrease = Math.round(((currentSpend - avg) / avg) * 100);
        anomalies.push({
          category,
          currentSpend,
          historicalAverage: Math.round(avg),
          percentIncrease,
          message: `${category} spending is ${percentIncrease}% higher than your usual monthly average (₹${Math.round(
            avg
          )}).`,
        });
      }
    }
    anomalies.sort((a, b) => b.percentIncrease - a.percentIncrease);

    // ---- 2. Next-month forecast (total spend, via linear regression) ----
    let forecast = null;
    const totalsSeries = sortedMonthKeys.map((k, idx) => ({ x: idx, y: monthly[k]._total }));

    if (totalsSeries.length >= 2) {
      const model = linearRegression(totalsSeries);
      const nextX = totalsSeries.length; // index of the next, not-yet-happened month
      const predicted = Math.max(0, Math.round(predict(model, nextX)));
      forecast = {
        predictedNextMonthTotal: predicted,
        trend: model.slope > 5 ? "increasing" : model.slope < -5 ? "decreasing" : "stable",
        monthsAnalyzed: totalsSeries.length,
      };
    } else {
      forecast = {
        predictedNextMonthTotal: totalsSeries[0].y,
        trend: "insufficient_data",
        monthsAnalyzed: totalsSeries.length,
      };
    }

    res.json({ anomalies, forecast, monthlyBreakdown: monthly });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};