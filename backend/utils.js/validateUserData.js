import User from "../models/userModel.js";

// Regex to validate email format
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Validation function for registration
export const validateRegistration = async (name, email, phone, address, role, landmark, password) => {
  if (!name || !email || !phone || !address || !role || !password) {
    return { valid: false, message: "All required fields (name, email, phone, address, role, password) must be provided" };
  }

  // Check if email format is correct
  if (!emailRegex.test(email)) {
    return { valid: false, message: "Invalid email format" };
  }

  // Check if phone is valid (optional regex for phone)
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    return { valid: false, message: "Invalid phone number format" };
  }

  // Check if role is valid
  const validRoles = ["admin", "consignee", "consigner"];
  if (!validRoles.includes(role)) {
    return { valid: false, message: `Invalid role. Must be one of: ${validRoles.join(", ")}` };
  }

  // Check if password meets criteria (e.g., minimum 6 characters)
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters long" };
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { valid: false, message: "User already exists with this email" };
  }

  return { valid: true };
};

// Validation function for login
export const validateLogin = async (email, password) => {
  if (!email || !password) {
    return { valid: false, message: "Both email and password are required" };
  }

  // Check if email format is correct
  if (!emailRegex.test(email)) {
    return { valid: false, message: "Invalid email format" };
  }

  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    return { valid: false, message: "User not found with this email" };
  }

  // Check if password is correct (this is done later in the controller)
  return { valid: true, user };
};
