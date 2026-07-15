@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* ── Tokens ─────────────────────────────────────────────────── */
:root {
  --navy:       #0f172a;
  --navy-light: #1e293b;
  --navy-mid:   #334155;
  --slate:      #64748b;
  --slate-light:#94a3b8;
  --border:     #e2e8f0;
  --bg:         #f8fafc;
  --white:      #ffffff;
  --emerald:    #10b981;
  --emerald-dk: #059669;
  --amber:      #f59e0b;
  --red:        #ef4444;
  --red-light:  #fef2f2;
  --indigo:     #6366f1;
  --text-1:     #0f172a;
  --text-2:     #475569;
  --text-3:     #94a3b8;
  --radius:     12px;
  --radius-sm:  8px;
  --shadow:     0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06);
  --shadow-md:  0 4px 16px rgba(0,0,0,.10);
  --sidebar-w:  240px;
}

/* ── Reset ───────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Inter', system-ui, sans-serif;
  background: var(--bg);
  color: var(--text-1);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* ── Layout ──────────────────────────────────────────────────── */
.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: var(--sidebar-w);
  padding: 2rem;
  max-width: 960px;
}

/* ── Sidebar ─────────────────────────────────────────────────── */
.sidebar {
  position: fixed;
  top: 0; left: 0; bottom: 0;
  width: var(--sidebar-w);
  background: var(--navy);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  z-index: 100;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: .6rem;
  padding: .25rem .5rem 1.5rem;
  border-bottom: 1px solid var(--navy-mid);
  margin-bottom: 1rem;
}

.logo-icon {
  font-size: 1.4rem;
  color: var(--emerald);
  font-weight: 700;
}

.logo-text {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--white);
  letter-spacing: -.02em;
}

.sidebar-user {
  display: flex;
  align-items: center;
  gap: .75rem;
  padding: .75rem .5rem 1rem;
  margin-bottom: .5rem;
}

.user-avatar {
  width: 36px; height: 36px;
  background: var(--emerald);
  color: white;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700;
  font-size: .9rem;
  flex-shrink: 0;
}

.user-name {
  font-size: .85rem;
  font-weight: 600;
  color: var(--white);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  font-size: .72rem;
  color: var(--slate-light);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: .25rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: .75rem;
  padding: .6rem .75rem;
  border-radius: var(--radius-sm);
  color: var(--slate-light);
  text-decoration: none;
  font-size: .875rem;
  font-weight: 500;
  transition: background .15s, color .15s;
}

.nav-item:hover { background: var(--navy-light); color: var(--white); }
.nav-item--active { background: var(--navy-light); color: var(--white); }
.nav-item--active .nav-icon { color: var(--emerald); }

.nav-icon {
  font-size: 1rem;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.sidebar-logout {
  display: flex;
  align-items: center;
  gap: .6rem;
  padding: .6rem .75rem;
  border-radius: var(--radius-sm);
  background: none;
  border: 1px solid var(--navy-mid);
  color: var(--slate-light);
  font-size: .875rem;
  cursor: pointer;
  transition: background .15s, color .15s;
  margin-top: .5rem;
}
.sidebar-logout:hover { background: var(--red); border-color: var(--red); color: white; }

/* ── Cards ───────────────────────────────────────────────────── */
.card {
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.5rem;
  border: 1px solid var(--border);
}

.stat-card {
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--border);
}

.stat-label {
  font-size: .75rem;
  font-weight: 600;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: .06em;
  margin-bottom: .4rem;
}

.stat-value {
  font-size: 1.875rem;
  font-weight: 700;
  letter-spacing: -.02em;
  line-height: 1;
}

.stat-value--green { color: var(--emerald); }
.stat-value--red   { color: var(--red); }
.stat-value--dark  { color: var(--text-1); }

/* ── Grid helpers ─────────────────────────────────────────────── */
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }

/* ── Page heading ────────────────────────────────────────────── */
.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-1);
  letter-spacing: -.02em;
  margin-bottom: 1.5rem;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

/* ── Forms ───────────────────────────────────────────────────── */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .75rem;
}

.form-group { display: flex; flex-direction: column; gap: .35rem; }

.form-label {
  font-size: .75rem;
  font-weight: 600;
  color: var(--text-2);
  text-transform: uppercase;
  letter-spacing: .05em;
}

.form-input, .form-select {
  padding: .6rem .85rem;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: .875rem;
  color: var(--text-1);
  background: var(--white);
  transition: border-color .15s, box-shadow .15s;
  outline: none;
  font-family: inherit;
}

.form-input:focus, .form-select:focus {
  border-color: var(--emerald);
  box-shadow: 0 0 0 3px rgba(16,185,129,.12);
}

.form-input.full, .form-select.full { grid-column: 1 / -1; }

/* ── Buttons ─────────────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .4rem;
  padding: .6rem 1.25rem;
  border-radius: var(--radius-sm);
  font-size: .875rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background .15s, transform .1s;
  font-family: inherit;
}

.btn:active { transform: scale(.98); }

.btn-primary { background: var(--emerald); color: white; }
.btn-primary:hover { background: var(--emerald-dk); }

.btn-dark { background: var(--navy); color: white; }
.btn-dark:hover { background: var(--navy-light); }

.btn-danger { background: var(--red); color: white; }
.btn-ghost {
  background: none;
  color: var(--red);
  border: none;
  padding: .25rem .5rem;
  font-size: .8rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}
.btn-ghost:hover { text-decoration: underline; }

.btn-full { width: 100%; grid-column: 1 / -1; }

/* ── Table/List ──────────────────────────────────────────────── */
.list { display: flex; flex-direction: column; }

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .875rem 0;
  border-bottom: 1px solid var(--border);
}

.list-item:last-child { border-bottom: none; }

.list-item-title {
  font-size: .875rem;
  font-weight: 600;
  color: var(--text-1);
}

.list-item-sub {
  font-size: .75rem;
  color: var(--text-3);
  margin-top: .1rem;
}

.amount-positive { font-weight: 700; color: var(--emerald); font-size: .95rem; }
.amount-negative { font-weight: 700; color: var(--red); font-size: .95rem; }

/* ── Tags ────────────────────────────────────────────────────── */
.tag {
  display: inline-block;
  padding: .2rem .6rem;
  border-radius: 999px;
  font-size: .7rem;
  font-weight: 600;
  background: #f1f5f9;
  color: var(--text-2);
}

/* ── Progress bar ────────────────────────────────────────────── */
.progress-track {
  width: 100%;
  background: var(--border);
  border-radius: 999px;
  height: 6px;
  margin-top: .5rem;
}

.progress-fill {
  height: 6px;
  border-radius: 999px;
  transition: width .4s;
}

.progress-fill--ok     { background: var(--emerald); }
.progress-fill--warn   { background: var(--amber); }
.progress-fill--danger { background: var(--red); }

/* ── Alerts ──────────────────────────────────────────────────── */
.alert {
  padding: .875rem 1rem;
  border-radius: var(--radius-sm);
  border-left: 4px solid;
  font-size: .875rem;
}

.alert-danger  { background: var(--red-light); border-color: var(--red); color: #b91c1c; }
.alert-success { background: #f0fdf4; border-color: var(--emerald); color: #065f46; }
.alert-info    { background: #eff6ff; border-color: var(--indigo); color: #3730a3; }

/* ── Auth pages ──────────────────────────────────────────────── */
.auth-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--navy);
}

.auth-card {
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
}

.auth-logo {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-logo-icon {
  font-size: 2rem;
  color: var(--emerald);
  display: block;
  margin-bottom: .25rem;
}

.auth-logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--navy);
  letter-spacing: -.02em;
}

.auth-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-1);
  margin-bottom: 1.5rem;
}

.auth-footer {
  margin-top: 1.25rem;
  text-align: center;
  font-size: .875rem;
  color: var(--text-3);
}

.auth-footer a { color: var(--emerald); font-weight: 600; text-decoration: none; }
.auth-footer a:hover { text-decoration: underline; }

/* ── Empty states ─────────────────────────────────────────────── */
.empty {
  text-align: center;
  padding: 2.5rem 1rem;
  color: var(--text-3);
  font-size: .875rem;
}

/* ── Insight cards ───────────────────────────────────────────── */
.insight-forecast {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  margin-top: .5rem;
}

.forecast-amount {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--indigo);
  letter-spacing: -.03em;
  line-height: 1;
}

.trend-badge {
  padding: .2rem .65rem;
  border-radius: 999px;
  font-size: .75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .04em;
  margin-bottom: .25rem;
}

.trend-badge--up       { background: #fef2f2; color: var(--red); }
.trend-badge--down     { background: #f0fdf4; color: var(--emerald-dk); }
.trend-badge--stable   { background: #f1f5f9; color: var(--text-2); }
