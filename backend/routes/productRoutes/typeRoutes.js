import express from "express";
import { 
  createType, 
  getAllTypes, 
  getTypeById, 
  updateType, 
  deleteType 
} from "../../controllers/product/typeController.js";

const router = express.Router();

// Create Type
router.post("/type", createType);

// Get All Types
router.get("/types", getAllTypes);

// Get a Specific Type by ID
router.get("/type/:id", getTypeById);

// Update Type by ID
router.put("/type/:id", updateType);

// Delete Type by ID
router.delete("/type/:id", deleteType);

export default router;
