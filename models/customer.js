const Joi = require('joi');
const mongoose = require('mongoose');

exports.Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
}));

exports.validateCustomer = (customer) => {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(customer, schema);
}