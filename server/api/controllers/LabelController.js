import Label from "../../db/models/Label.js";

// Create Label
export const createLabel = async (req, res) => {
  try {
    const label = await Label.create(req.body);
    res.status(201).json(label);
  } catch (error) {
    console.error("Error creating label:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Labels
export const getLabels = async (req, res) => {
  try {
    const labels = await Label.find();
    res.json(labels);
  } catch (error) {
    console.error("Error fetching labels:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Single Label
export const getLabel = async (req, res) => {
  try {
    const label = await Label.findById(req.params.id);
    if (!label) {
      return res.status(404).json({ message: "Label not found" });
    }
    res.json(label);
  } catch (error) {
    console.error("Error fetching label:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Label
export const updateLabel = async (req, res) => {
  try {
    const label = await Label.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!label) {
      return res.status(404).json({ message: "Label not found" });
    }
    res.json(label);
  } catch (error) {
    console.error("Error updating label:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Label
export const deleteLabel = async (req, res) => {
  try {
    const label = await Label.findByIdAndDelete(req.params.id);
    if (!label) {
      return res.status(404).json({ message: "Label not found" });
    }
    res.json({ message: "Label deleted" });
  } catch (error) {
    console.error("Error deleting label:", error);
    res.status(500).json({ message: "Server error" });
  }
};
