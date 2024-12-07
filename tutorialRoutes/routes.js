const express = require("express");
const {
  addNewTutorial,
  findTutorialById,
  getAllTutorials,
  publishedTutorials,
  updateTutorial,
  removeTutorialById,
  removeTutorials,
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

//update a Tutorial by id

router.put("/:id", updateTutorial);

//delete a tutorial by Id

router.delete("/:id", removeTutorialById);

//remove all tutorials

router.delete("/", removeTutorials);

module.exports = router;
