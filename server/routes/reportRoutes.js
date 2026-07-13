import express from "express";
import { exportCSV, exportPDF } from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(protect);

router.get("/csv", exportCSV);
router.get("/pdf", exportPDF);

export default router;
