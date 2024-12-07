const {
  createTutorial,
  findTutorial,
  getTutorials,
  getPublishedTutorials,
  updateTutorialById,
  removeTutorial,
  removeAllTutorial,
} = require("../models/model");

const addNewTutorial = async (req, res) => {
  const { title, description, published } = req.body;

  try {
    const result = await createTutorial(title, description, published);
    res.status(201).json({ id: result.lastID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const findTutorialById = async (req, res) => {
  const { id } = req.params;
  try {
    const row = await findTutorial(id);
    if (!row) {
      return res.status(404).json({ message: "Tutorial not found" });
    }
    res.status(200).json(row);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTutorials = async (req, res) => {
  try {
    const rows = await getTutorials();
    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const publishedTutorials = async (req, res) => {
  try {
    const { published } = req.query;
    console.log(published);
    const rows = await getPublishedTutorials(published);
    res.status(200).json(rows);
    // console.log(rows)
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updateTutorial = async (req, res) => {
  try {
    const { id } = req.params;
    const change = await updateTutorialById(id);
    if (change === 0) {
      return res.status(204).send("no content");
    }
    res.status(200).send("updated successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeTutorialById = async (req, res) => {
  try {
    const { id } = req.params;
    const change = await removeTutorial(id);
    if (!change) {
      return res.status(204).send("no content");
    }
    res.status(200).send("Deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeTutorials = async (req, res) => {
  try {
    const change = await removeAllTutorial();
    if (!change) {
      return res.status(204).send("no content");
    }
    res.status(200).send("Deleted All successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addNewTutorial,
  findTutorialById,
  getAllTutorials,
  publishedTutorials,
  updateTutorial,
  removeTutorialById,
  removeTutorials,
};
