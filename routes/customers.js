
const express = require('express');

const { Customer, validateCustomer } = require('../models/customer')

const router= express.Router();

router.get('/',async (req,res) => {
  const customers = await Customer.find().sort({name: 1});
  res.send(customers);
});

router.post('/',async (req,res) => {
  const { error } = validateCustomer(req.body);
  if(error){
    return res.status(400).send(error.detials[0].message);
  }
  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
  customer = await customer.save();
  res.send(customer);
});

router.put('/:id', async (req,res) => {
  const { error } = validatecustomer(req.body);
   if(error){
    return res.status(400).send(error.detials[0].message);
  }
  const customer = await Customer.findByIdAndUpdate(
    req.body.id, 
    { name: req.body.name}, 
    { new : true}
  );
  if(!customer) return res.status(404).send('Not exist');
  res.send(customer);
});

router.get('/:id', async (req,res) => {
  const customer = await Customer.findById(req.params.id);
  if(!customer) return res.status(404).send('Not exist');
  res.send(customer)
});

router.delete('/:id', async (req,res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if(!customer) return res.status(404).send('Not exist');
  res.send(customer);
});

module.exports = router;