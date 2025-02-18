import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateToken.js";
import { validateLogin, validateRegistration } from "../../utils/validateUserData.js";
import { User } from "../../models/userModal/userModel.js";

// Register a user
export const register = async (req, res) => {
  try {
    const { name, email, phone, address, role, landmark, password } = req.body;

    const userRole = role || "user";

    // Perform registration validation
    const registrationValidation = await validateRegistration(
      name, email, phone, address, userRole, landmark, password
    );
    if (!registrationValidation.valid) {
      return res.status(400).json({ message: registrationValidation.message });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({
      name, email, phone, address, role: userRole, landmark, password: hashedPassword
    });

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

    if (user.role.toLowerCase() === "user") {
      return res.status(400).json({ message: "Access Denied" });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    res.json({ user, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a user's role
export const updateUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    if (!userId || !role) {
      return res.status(400).json({ message: "User ID and role are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

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

// Update user details
// Update user details including role
// Update user details by ID
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;  // Get userId from route parameter
    const { name, email, phone, address, landmark, role } = req.body; // Get other user details from request body

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (landmark) user.landmark = landmark;
    if (role) user.role = role;

    // Save the updated user
    await user.save();
    res.json({ message: "User updated successfully", user });

  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });

  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
