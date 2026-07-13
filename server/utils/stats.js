// Small, dependency-free statistics helpers used by the AI Insights module.
// Kept separate from the controller so the math is easy to unit-test and explain in a report.

export const mean = (nums) => (nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0);

export const stdDev = (nums) => {
  if (nums.length < 2) return 0;
  const m = mean(nums);
  const variance = nums.reduce((sum, n) => sum + (n - m) ** 2, 0) / nums.length;
  return Math.sqrt(variance);
};

// Simple linear regression (least squares) over points [{x, y}], returns {slope, intercept}
export const linearRegression = (points) => {
  const n = points.length;
  if (n < 2) return { slope: 0, intercept: points[0]?.y || 0 };

  const sumX = points.reduce((s, p) => s + p.x, 0);
  const sumY = points.reduce((s, p) => s + p.y, 0);
  const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
  const sumXX = points.reduce((s, p) => s + p.x * p.x, 0);

  const denominator = n * sumXX - sumX * sumX;
  if (denominator === 0) return { slope: 0, intercept: sumY / n };

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
};

export const predict = ({ slope, intercept }, x) => slope * x + intercept;