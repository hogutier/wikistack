const {addPage, main} = require('../views');
const router = require('express').Router();

router.get('/', (req, res, next) => {
  //res.send('Hello from Wiki!');
  res.send(main());
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.post('/', (req, res, next) => {
  res.json(req.body);
});

module.exports = router;
