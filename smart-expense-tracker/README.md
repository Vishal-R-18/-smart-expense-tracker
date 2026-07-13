# Smart Expense Tracker

A full-stack expense tracker built with React, Node.js, Express, and MongoDB — with JWT authentication, budgets, charts, and PDF/CSV reports.

## Project Structure

```
smart-expense-tracker/
├── server/              # Express + MongoDB backend
│   ├── config/          # DB connection
│   ├── models/          # User, Income, Expense, Budget
│   ├── controllers/     # Route handlers
│   ├── routes/          # API routes
│   ├── middleware/      # JWT auth, error handling
│   └── server.js        # Entry point
└── client/              # React + Vite + Tailwind frontend
    └── src/
        ├── pages/        # Login, Register, Dashboard, Income, Expenses, Budget, Reports
        ├── components/   # Navbar, ProtectedRoute, ExpenseChart
        ├── context/      # AuthContext (JWT session state)
        └── services/     # Axios API client
```

## Setup

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
# edit .env: set MONGO_URI (use MongoDB Atlas or local MongoDB) and JWT_SECRET
npm run dev
```
Server runs on `http://localhost:5000`.

### 2. Frontend

```bash
cd client
npm install
npm run dev
```
App runs on `http://localhost:5173` (Vite proxies `/api` calls to the backend).

## API Overview

| Route | Description |
|---|---|
| `POST /api/auth/register` | Create account |
| `POST /api/auth/login` | Login, returns JWT |
| `GET /api/auth/profile` | Get logged-in user (protected) |
| `GET/POST /api/income` | List / add income |
| `PUT/DELETE /api/income/:id` | Update / delete income |
| `GET/POST /api/expenses` | List / add expenses (supports `?category=&from=&to=`) |
| `GET /api/expenses/summary` | Totals grouped by category (for the pie chart) |
| `PUT/DELETE /api/expenses/:id` | Update / delete expense |
| `GET/POST /api/budget` | List / set monthly budgets |
| `GET /api/budget/status?month=&year=` | Budget vs actual spend comparison |
| `GET /api/reports/csv` | Download expenses as CSV |
| `GET /api/reports/pdf` | Download a summary report as PDF |

All routes except `/auth/register` and `/auth/login` require an `Authorization: Bearer <token>` header.

## What's implemented vs. what's left for you

**Implemented (ready to run):**
- Full auth flow (register/login/JWT), password hashing
- Income & Expense CRUD
- Budget planner with over-budget detection
- Category-wise pie chart on dashboard
- CSV and PDF report export

**Left as extension work (good for your report/viva "future scope" section):**
- **AI Insights module**: not yet built. Suggested concrete version: a rule-based or lightweight ML model (e.g. scikit-learn on exported CSV data) that flags months where a category's spend deviates significantly from the user's historical average, or predicts next month's likely spend per category using simple linear regression. This gives you a defensible, explainable "AI" feature rather than a vague one.
- **Notifications**: email/browser alerts when a budget is exceeded (can use Nodemailer or a toast on login by calling `/budget/status`).
- **Deployment**: instructions for Vercel (client) + Render (server) + MongoDB Atlas are in the original project guide — happy to walk through that when you're ready.

## Notes for your project report

- **Architecture**: MERN stack, REST API, JWT-based stateless auth.
- **Security**: passwords hashed with bcrypt, protected routes via middleware, user-scoped queries (every query filters by `req.user._id` so users can't see each other's data).
- **Database design**: 4 collections (Users, Income, Expense, Budget), with a compound unique index on Budget to prevent duplicate budgets per category/month/year.
