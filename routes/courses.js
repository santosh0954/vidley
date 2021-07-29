const express = require("express");
const router = express.Router();
const { validateCourse, Courses } = require("../models/courses");
const validateId = require("../models/validateId");

router.get("/", async (req, res) => {
  const courses = await Courses.find().sort("name");
  res.send(courses);
});
router.get("/:id", async (req, res) => {
  if (!validateId(req.params.id))
    return res.status(404).send("This course with the given Id was not valid.");
  const course = await Courses.findById(req.params.id);
  if (!course)
    return res.status(404).send("This course with the given Id was not found.");
  res.send(course);
});
// Posting the data
router.post("/", async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let course = new Courses(req.body);
  course = await course.save();
  res.send(course);
});
// updataing the data
router.put("/:id", async (req, res) => {
  if (!validateId(req.params.id))
    return res.status(400).send("Given Id not valid.");
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const course = await Courses.findByIdAndUpdate(req.paramas.id, req.body, {
    new: true,
  });
  if (!course) {
    res.status(404).send(`This course Id=${req.params.id} does not exist`);
    return;
  }
  res.send(course);
});
router.delete("/:id", async (req, res) => {
  if (!validateId(req.params.id))
    return res
      .status(404)
      .send(`This course Id=${req.params.id} was not valid`);
  const course = await Courses.findByIdAndDelete(req.params.id);
  if (!course)
    return res
      .status(404)
      .send(`This course Id=${req.params.id} does not exist`);
  res.send(course);
});

module.exports = router;
