const Joi = require("joi");
const mongoose = require("mongoose");

const Courses = mongoose.model(
  "courses",
  new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, default: "santosh jha" },
    price: { type: Number, required: true, min: 3 },
  })
);

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    author: Joi.string().min(3),
    price: Joi.number().min(3).required(),
  });
  return schema.validate(course);
}
module.exports = { validateCourse, Courses };
