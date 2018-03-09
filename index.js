const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const { main } = require('./views');
const { db } = require('./models');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', (req, res, next) => {
  res.send(main());
});

db.authenticate().then(() => {
  console.log('connected to the database');
  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  })
});
