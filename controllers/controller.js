const {
  createTutorial,
  findTutorial,
  getTutorials,
  getPublishedTutorials,
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

module.exports = {
  addNewTutorial,
  findTutorialById,
  getAllTutorials,
  publishedTutorials,
};
