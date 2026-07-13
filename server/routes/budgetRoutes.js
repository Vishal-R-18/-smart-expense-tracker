import express from "express";
import { getBudgets, setBudget, deleteBudget, getBudgetStatus } from "../controllers/budgetController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(protect);

router.get("/status", getBudgetStatus);
router.route("/").get(getBudgets).post(setBudget);
router.delete("/:id", deleteBudget);

export default router;
