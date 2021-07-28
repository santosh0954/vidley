const express = require("express");
const Joi = require("joi");

const router = express.Router();
router.use(express.json());

let genres = [
  { id: 1, name: "action" },
  { id: 2, name: "adventure" },
  { id: 3, name: "comedy" },
  { id: 4, name: "crime" },
  { id: 5, name: "fantasy" },
  { id: 6, name: "horror" },
  { id: 7, name: "history" },
  { id: 8, name: "mystory" },
  { id: 9, name: "thriller" },
];
// getting all data
router.get("/", (req, res) => {
  res.send(genres);
});
// getting single id data
router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("The given Id genre not found.");
  res.send(genre);
});
// adding data
router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});
// updating data
router.put("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("The given Id genre not found.");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});
router.delete("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("The given Id genre not found.");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});
// validation user data
function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

module.exports = router;
