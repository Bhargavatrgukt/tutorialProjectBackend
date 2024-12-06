const express = require("express");
const {
  addNewTutorial,
  findTutorialById,
  getAllTutorials,
  publishedTutorials,
} = require("../controllers/controller");

const router = express.Router();

router.post("/", addNewTutorial); //posting tutorials

router.get("/:id", findTutorialById); //getting tutorial By Id

router.get("/", (req, res) => {
  const { published } = req.query;
  if (published === undefined) {
    return getAllTutorials(req, res);
  } else {
    console.log("verified");
    return publishedTutorials(req, res);
  }
});

module.exports = router;
