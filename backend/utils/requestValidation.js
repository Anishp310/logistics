// requestValidation.js
import { check, validationResult } from "express-validator";

// Validation middleware for creating and updating a request
export const validateRequest = [
  check("product").notEmpty().withMessage("Product is required"),
  check("quantity").isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),
  check("totalPrice").isFloat({ gt: 0 }).withMessage("Total price must be a positive number"),
  check("sender").notEmpty().withMessage("Sender is required"),
  check("receiver").notEmpty().withMessage("Receiver is required"),
  check("createdBy").notEmpty().withMessage("Created by field is required"),
  
  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
