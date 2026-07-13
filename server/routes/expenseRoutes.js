import express from "express";
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getExpenseSummary,
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(protect);

router.get("/summary", getExpenseSummary);
router.route("/").get(getExpenses).post(addExpense);
router.route("/:id").put(updateExpense).delete(deleteExpense);

export default router;
