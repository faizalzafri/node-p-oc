const express = require('express');
const mongoose = require('mongoose');

const { Movie, validateMovie } = require('../models/movie')
const { Genre } = require('../models/genre')

const router= express.Router();

router.get('/',async (req,res) => {
  const movies = await Movie.find().sort({name: 1});
  res.send(movies);
});

router.post('/',async (req,res) => {
  const { error } = validateMovie(req.body);
  if(error){
    return res.status(400).send(error.detials[0].message);
  }
  const genre = await Genre.findById(req.body.genreId);
  if(!genre) return res.status(400).send('Invalid Genre');

  let movie = new Movie({
    title: req.body.title,
    genre:{
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.numberInStock
  });
  movie = await movie.save();
  res.send(movie);
});

// router.put('/:id', async (req,res) => {
//   const { error } = validateMovie(req.body);
//    if(error){
//     return res.status(400).send(error.detials[0].message);
//   }
//   const genre = await Genre.findById(req.body.genreId);
//   if(!genre) return res.status(400).send('Invalid Genre');

//   const movie = await Movie.findByIdAndUpdate(
//     req.body.id, 
//     { title: req.body.title}, 
//     { new : true}
//   );
//   if(!movie) return res.status(404).send('Not exist');
//   res.send(movie);
// });

router.get('/:id', async (req,res) => {
  const movie = await Movie.findById(req.params.id);
  if(!movie) return res.status(404).send('Not exist');
  res.send(movie)
});

router.delete('/:id', async (req,res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if(!movie) return res.status(404).send('Not exist');
  res.send(movie);
});

module.exports = router;