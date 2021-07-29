const Joi = require("joi");
const mongoose = require("mongoose");

const Customers = mongoose.model(
  "customers",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 111111111 },
    isGold: { type: Boolean, default: false },
    mob: { type: String, min: 9, required: true },
  })
);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    isGold: Joi.boolean(),
    mob: Joi.string().required().min(9),
  });
  return schema.validate(customer);
}
module.exports = { validateCustomer, Customers };
