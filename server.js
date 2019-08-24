
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');

app.use(express.json());

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);

mongoose.connect('mongodb+srv://root:1234@viddly-mongo-mbacn.mongodb.net/test?retryWrites=true')
    .then(() => { console.log('Mongo Connected') })
    .catch(() => { console.log('Mongo Connection Failed') });

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening on ${port}..`) });