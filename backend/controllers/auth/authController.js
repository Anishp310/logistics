import bcrypt from "bcrypt";
import { generateToken } from "../../utils.js/generateToken.js";
import { validateLogin, validateRegistration } from "../../utils.js/validateUserData.js";
import { User } from "../../models/userModal/userModel.js";

// Register a user
export const register = async (req, res) => {
  try {
    const { name, email, phone, address, role, landmark, password } = req.body;

    const userRole = role || 'user';
    // Perform registration validation
    const registrationValidation = await validateRegistration(name, email, phone, address, userRole, landmark, password);
    if (!registrationValidation.valid) {
      return res.status(400).json({ message: registrationValidation.message });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({ name, email, phone, address, role, landmark, password: hashedPassword });

    // Send success response
    res.status(201).json({ message: "User registered successfully", user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// User login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Perform login validation
    const loginValidation = await validateLogin(email, password);
    if (!loginValidation.valid) {
      return res.status(400).json({ message: loginValidation.message });
    }

    const user = loginValidation.user;

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log(user)
    if (user.role.toLowerCase() === 'user') {
      return res.status(400).json({ message: "Access Denied" });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    // Send response with token
    res.json({ user, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a user's role based on user_id
export const updateUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body; // role is passed in the request body
    console.log( userId, role)
    if (!userId || !role) {
      return res.status(400).json({ message: "User ID and role are required" });
    }

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's role
    user.role = role;
    await user.save();

    // Send success response
    res.json({ message: "User role updated successfully", user });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
