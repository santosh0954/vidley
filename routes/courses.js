const express = require("express");
const Joi = require("joi");
const router = express.Router();

const courses = [
  { id: 1, name: "courses 1" },
  { id: 2, name: "courses 2" },
  { id: 3, name: "courses 3" },
  { id: 4, name: "courses 4" },
];

router.get("/", (req, res) => {
  res.send(courses);
});
router.get("/:id", (req, res) => {
  console.log(req.params.id);
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("This course with the given Id was not found.");
  res.send(course);
});
// Posting the data
router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
    age: req.body.age,
  };
  courses.push(course);
  res.send(course);
});
// updataing the data
router.put("/:id", (req, res) => {
  // Check the id if course exist of not
  // If not then return 404 status code not found
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  console.log(course);

  if (!course) {
    res.status(404).send(`This course Id=${req.params.id} does not exist`);
    return;
  }

  // validate
  // If invalid the return 400 Bad request
  const { error } = validateCourse(req.body);
  console.log(error);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  course.name = req.body.name;
  res.send(course);

  // console.log(newCourse);
});
router.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  console.log(course);

  if (!course) {
    res.status(404).send(`This course Id=${req.params.id} does not exist`);
    return;
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

module.exports = router;
