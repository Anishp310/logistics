import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Get the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    next(); 
  } catch (error) {
    console.error("Token verification error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please login again." });
    }

    return res.status(400).json({ message: "Invalid token." });
  }
};
// Correct ES Module export
export default protect;
