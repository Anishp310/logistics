import express from "express";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../../controllers/product/productController.js";
import { validateProduct } from "../../utils.js/validateProduct.js";

const router = express.Router();


// Product Routes
router.post("/", validateProduct, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", validateProduct, updateProduct);
router.delete("/:id", deleteProduct);

export default router;
