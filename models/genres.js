const Joi = require("joi");
const mongoose = require("mongoose");

const Genres = mongoose.model(
  "Genres",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
  })
);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}
module.exports = { validateGenre, Genres };
