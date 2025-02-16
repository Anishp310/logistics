import express from "express";
import { 
  createNature, 
  getAllNatures, 
  getNatureById, 
  updateNature, 
  deleteNature 
} from "../../controllers/product/natureController.js";

const router = express.Router();

// Create Nature
router.post("/nature", createNature);

// Get All Natures
router.get("/natures", getAllNatures);

// Get a Specific Nature by ID
router.get("/nature/:id", getNatureById);

// Update Nature by ID
router.put("/nature/:id", updateNature);

// Delete Nature by ID
router.delete("/nature/:id", deleteNature);

export default router;
