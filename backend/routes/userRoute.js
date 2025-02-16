import express from "express";
import { getAllUsers, getConsigneeUsers, getConsignorUsers, login, register } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Example Route
router.post("/register", register);
router.post("/login", login);

router.get("/consignee", getConsigneeUsers);
router.get("/consignor", getConsignorUsers);
router.get("/all", getAllUsers);

export default router; // Correct ES module export
