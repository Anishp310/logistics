import express from "express";
import protect from "../../middleware/authMiddleware.js";
import {
  getAllUsers, login, register, updateUserRole, updateUser, deleteUser,
  getUserById
} from "../../controllers/auth/authController.js";

const router = express.Router();

// User registration
router.post("/register", register);

// User login
router.post("/login", login);

// Update user role
router.put("/role", updateUserRole);

// Get all users
router.get("/all", getAllUsers);

router.get("/user/:userId", getUserById);

// Update user details
// Update user details by ID
router.put("/update/:userId", updateUser);  // Changed to use :userId in route


// Delete user
router.delete("/delete/:userId", deleteUser);

export default router;
