const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 3000;
const {main} = require('./views');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', (req, res, next) => {
  res.send(main());
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
})
