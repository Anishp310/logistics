import { ProductType } from "../../models/productModel/typeModal.js";

export const createType = async (req, res) => {
  try {
    const { name, user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if the type already exists
    const typeExists = await ProductType.findOne({ name });
    if (typeExists) {
      return res.status(400).json({ message: "Type already exists" });
    }

    const type = new ProductType({ name, user_id });
    await type.save();

    res.status(201).json({ message: "Type created successfully", type });
  } catch (error) {
    res.status(500).json({ message: "Error creating type", error: error.message });
  }
};

// Get all Product Types
export const getAllTypes = async (req, res) => {
  try {
    const types = await ProductType.find();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: "Error fetching types", error: error.message });
  }
};

// Get a specific Product Type by ID
export const getTypeById = async (req, res) => {
  try {
    const typeId = req.params.id;
    const type = await ProductType.findById(typeId);

    if (!type) {
      return res.status(404).json({ message: "Type not found" });
    }

    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({ message: "Error fetching type", error: error.message });
  }
};
// Update Product Type by ID
export const updateType = async (req, res) => {
  try {
    const typeId = req.params.id;
    const { name, user_id } = req.body;

    // Find and update the type
    const updatedType = await ProductType.findByIdAndUpdate(
      typeId,
      { name, user_id },
      { new: true } // Returns the updated document
    );

    if (!updatedType) {
      return res.status(404).json({ message: "Type not found" });
    }

    res.status(200).json({ message: "Type updated successfully", updatedType });
  } catch (error) {
    res.status(500).json({ message: "Error updating type", error: error.message });
  }
};
// Delete Product Type by ID
export const deleteType = async (req, res) => {
  try {
    const typeId = req.params.id;
    
    const deletedType = await ProductType.findByIdAndDelete(typeId);

    if (!deletedType) {
      return res.status(404).json({ message: "Type not found" });
    }

    res.status(200).json({ message: "Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting type", error: error.message });
  }
};
