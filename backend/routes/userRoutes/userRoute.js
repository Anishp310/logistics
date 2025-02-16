import express from "express";
import protect from "../../middleware/authMiddleware.js"; // Assuming you have a middleware for authentication
import { getAllUsers, login, register, updateUserRole } from "../../controllers/auth/authController.js";

const router = express.Router();

// User registration
router.post("/register", register);

// User login
router.post("/login", login);

// Update user role
router.put("/role", updateUserRole); // Corrected to PUT method

// Get all users
router.get("/all", getAllUsers);

export default router;
