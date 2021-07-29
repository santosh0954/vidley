const express = require("express");
const router = express.Router();
const { validateGenre, Genres } = require("../models/genres");
const validateId = require("../models/validateId");

router.get("/", async (req, res) => {
  const genres = await Genres.find().sort("name");
  res.send(genres);
});
router.get("/:id", async (req, res) => {
  if (!validateId(req.params.id))
    return res.status(404).send("The given Id genre not found.");
  const genre = await Genres.findById(req.params.id);
  if (!genre) return res.status(404).send("The given Id genre not found.");
  res.send(genre);
});
// adding data
router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genres({
    name: req.body.name,
  });
  genre = await genre.save();
  res.send(genre);
});
router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (!validateId(req.params.id))
    return res.status(404).send("The given Id genre not found.");
  const genre = await Genres.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) return res.status(404).send("The given Id genre not found.");
  res.send(genre);
});
router.delete("/:id", async (req, res) => {
  if (!validateId(req.params.id))
    return res.status(404).send("The given Id genre not found.");
  const genre = await Genres.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send("The given Id genre not found.");
  res.send(genre);
});

module.exports = router;
