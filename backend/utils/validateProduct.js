import { check, validationResult } from "express-validator";

// Validation middleware for creating and updating a product
export const validateProduct = [
  check("name").notEmpty().withMessage("Product name is required"),
  check("quantity").isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),
  check("value").isFloat({ gt: 0 }).withMessage("Value must be a positive number"),
  check("dimensions").notEmpty().withMessage("Dimensions are required"),
  check("weight").isFloat({ gt: 0 }).withMessage("Weight must be a positive number"),
  check("type").notEmpty().withMessage("Product type is required"),
  check("nature").isArray().withMessage("Nature must be an array").optional(),
  check("hs_code").notEmpty().withMessage("HS Code is required"),
  check("user_id").notEmpty().withMessage("User ID is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
