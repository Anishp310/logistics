import express from "express";
import { createRequest, deleteRequest, getAllRequests, getRequestById, updateRequest } from "../../controllers/job/requestController.js";

const router = express.Router();

router.post("/request", createRequest);  // Apply validation middleware
router.get("/request", getAllRequests);
router.get("/request/:id", getRequestById);
router.put("/request/:id", updateRequest);
router.delete("/request/:id", deleteRequest);

export default router;
