import { Request } from "../../models/jobModal/requestModal.js";

// Create a new request
export const createRequest = async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate("product sender receiver");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get request by ID
export const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate("product sender receiver");
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update request status
export const updateRequest = async (req, res) => {
  try {
    const updatedRequest = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRequest) return res.status(404).json({ message: "Request not found" });
    res.json(updatedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete request
export const deleteRequest = async (req, res) => {
  try {
    const deletedRequest = await Request.findByIdAndDelete(req.params.id);
    if (!deletedRequest) return res.status(404).json({ message: "Request not found" });
    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
