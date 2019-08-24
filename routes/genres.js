const express = require('express');

const { Genre, validateGenre } = require('../models/genre');

const router= express.Router();

router.get('/',async (req,res) => {
  const genres = await Genre.find().sort({name: 1});
  res.send(genres);
});

router.post('/',async (req,res) => {
  const { error } = validateGenre(req.body);
  if(error){
    return res.status(400).send(error.detials[0].message);
  }
  let genre = new Genre({
    name: req.body.name
  });
  genre = await genre.save();
  res.send(genre);
});

router.put('/:id', async (req,res) => {
  const { error } = validateGenre(req.body);
   if(error){
    return res.status(400).send(error.detials[0].message);
  }
  const genre = await Genre.findByIdAndUpdate(
    req.body.id, 
    { name: req.body.name}, 
    { new : true}
  );
  if(!genre) return res.status(404).send('Not exist');
  res.send(genre);
});

router.get('/:id', async (req,res)=>{
   const genre = await Genre.findById(req.params.id);
  if(!genre) return res.status(404).send('Not exist');
  res.send(genre)
});

router.delete('/:id', async (req,res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if(!genre) return res.status(404).send('Not exist');
  res.send(genre);
});

module.exports = router;