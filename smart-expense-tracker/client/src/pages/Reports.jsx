import api from "../services/api.js";

const download = async (path, filename) => {
  const res = await api.get(path, { responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

const Reports = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      <div className="bg-white p-6 rounded shadow flex gap-4">
        <button
          onClick={() => download("/reports/csv", "expenses.csv")}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Download CSV
        </button>
        <button
          onClick={() => download("/reports/pdf", "report.pdf")}
          className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Reports;
