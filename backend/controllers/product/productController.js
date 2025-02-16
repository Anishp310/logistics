import { ProductNature } from "../../models/productModel/natureModal.js";
import { Product } from "../../models/productModel/productModel.js";
import { ProductType } from "../../models/productModel/typeModal.js";

// Create a new Product
export const createProduct = async (req, res) => {
  try {
    const { name, quantity, value, dimensions, weight, type, nature, hs_code, user_id } = req.body;
    
    // Validate if type and nature exist
    const productType = await ProductType.findById(type);
    const productNature = await ProductNature.find({ _id: { $in: nature } });

    if (!productType) {
      return res.status(404).json({ message: "Type not found" });
    }

    if (productNature.length === 0) {
      return res.status(404).json({ message: "Nature not found" });
    }

    const product = new Product({ name, quantity, value, dimensions, weight, type, nature, hs_code, user_id });
    await product.save();
    
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("type")
      .populate("nature")
      .populate("user_id");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("type")
      .populate("nature")
      .populate("user_id");
    
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("type")
      .populate("nature")
      .populate("user_id");
    
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};
