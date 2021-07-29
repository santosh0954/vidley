const express = require("express");
const router = express.Router();
const { validateCustomer, Customers } = require("../models/customers");
const validateId = require("../models/validateId");

router.get("/", async (req, res) => {
  const customers = await Customers.find().sort("name");
  res.send(customers);
});
router.get("/:id", async (req, res) => {
  if (!validateId(req.params.id))
    return res.status(400).send("Given Id is not Valid.");
  const customer = await Customers.findById(req.params.id);
  if (!customer) return res.status(404).send("Given Id customer not found.");
  res.send(customer);
});
router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let customer = new Customers(req.body);
  customer = await customer.save();
  res.send(customer);
});
router.put("/:id", async (req, res) => {
  console.log(req.body);
  if (!validateId(req.params.id))
    return res.status(404).send("Given Id is not Valid.");
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await Customers.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!customer) return res.status(404).send("Given Id is not Found.");
  res.send(customer);
});
router.delete("/:id", async (req, res) => {
  if (!validateId(req.params.id))
    return res.status(400).send("Given Id is not Valid.");
  const customer = await Customers.findByIdAndDelete(req.params.id);
  if (!customer) return res.status(404).send("Given Id is not Found.");
  res.send(customer);
});

module.exports = router;
