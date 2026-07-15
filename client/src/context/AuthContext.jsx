import api from "../services/api.js";

const download = async (path, filename) => {
  const res = await api.get(path, { responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url; link.setAttribute("download", filename);
  document.body.appendChild(link); link.click(); link.remove();
};

const Reports = () => (
  <div>
    <h1 className="page-title">Reports</h1>
    <div className="card">
      <p style={{fontWeight:600,marginBottom:".5rem",fontSize:".875rem"}}>Export your data</p>
      <p style={{color:"var(--text-3)",fontSize:".875rem",marginBottom:"1.5rem"}}>
        Download all your expense data as a spreadsheet or a formatted PDF summary report.
      </p>
      <div style={{display:"flex",gap:"1rem"}}>
        <button className="btn btn-primary" onClick={() => download("/reports/csv","expenses.csv")}>
          ↓ Download CSV
        </button>
        <button className="btn btn-dark" onClick={() => download("/reports/pdf","report.pdf")}>
          ↓ Download PDF
        </button>
      </div>
    </div>
  </div>
);

export default Reports;
