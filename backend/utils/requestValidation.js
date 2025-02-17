import { check, validationResult } from "express-validator";

export const validateRequest = [
  // Product validation
  check("product").isMongoId().withMessage("Product must be a valid ObjectId"),

  // Quantity validation
  check("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),

  // Total Price validation
  check("totalPrice")
    .isFloat({ gt: 0 })
    .withMessage("Total price must be a positive number"),

  // Sender validation
  check("sender").isMongoId().withMessage("Sender must be a valid ObjectId"),

  // Receiver validation
  check("receiver").isMongoId().withMessage("Receiver must be a valid ObjectId"),

  // Status validation
  check("status")
    .isIn(["Pending", "Active", "Finished", "Cancelled"])
    .withMessage("Invalid status value"),

  // Created By validation
  check("createdBy").isMongoId().withMessage("Created by must be a valid ObjectId"),

  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
