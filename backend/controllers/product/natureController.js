import { ProductNature } from "../../models/productModel/natureModal.js";

// Create a Nature
export const createNature = async (req, res) => {
  try {
    const { name, user_id } = req.body;

    // Ensure user_id is provided
    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    // Check if nature already exists
    const natureExists = await ProductNature.findOne({ name });
    if (natureExists) {
      return res.status(400).json({ message: "Nature already exists" });
    }

    // Create the new nature
    const nature = new ProductNature({ name, user_id });
    await nature.save();

    res.status(201).json({ message: "Nature created successfully", nature });
  } catch (error) {
    res.status(500).json({ message: "Error creating nature", error: error.message });
  }
};

// Get All Natures
export const getAllNatures = async (req, res) => {
  try {
    const natures = await ProductNature.find();
    console.log(natures)
    res.status(200).json(natures);
  } catch (error) {
    res.status(500).json({ message: "Error fetching natures", error: error.message });
  }
};

// Get Nature by ID
export const getNatureById = async (req, res) => {
  try {
    const natureId = req.params.id;
    const nature = await ProductNature.findById(natureId);

    if (!nature) {
      return res.status(404).json({ message: "Nature not found" });
    }

    res.status(200).json(nature);
  } catch (error) {
    res.status(500).json({ message: "Error fetching nature", error: error.message });
  }
};

// Update Nature by ID
export const updateNature = async (req, res) => {
  try {
    const natureId = req.params.id;
    const { name, user_id } = req.body;

    const updatedNature = await ProductNature.findByIdAndUpdate(
      natureId,
      { name, user_id },
      { new: true } // This will return the updated document
    );

    if (!updatedNature) {
      return res.status(404).json({ message: "Nature not found" });
    }

    res.status(200).json({ message: "Nature updated successfully", updatedNature });
  } catch (error) {
    res.status(500).json({ message: "Error updating nature", error: error.message });
  }
};

// Delete Nature by ID
export const deleteNature = async (req, res) => {
  try {
    const natureId = req.params.id;

    const deletedNature = await ProductNature.findByIdAndDelete(natureId);

    if (!deletedNature) {
      return res.status(404).json({ message: "Nature not found" });
    }

    res.status(200).json({ message: "Nature deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting nature", error: error.message });
  }
};
