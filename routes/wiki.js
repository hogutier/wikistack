const {addPage, main} = require('../views');
const router = require('express').Router();
const { Page } = require('../models');

router.get('/', (req, res, next) => {
  //res.send('Hello from Wiki!');
  res.send(main());
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.post('/', async (req, res, next) => {
  const {title, content} = req.body;
  const page = new Page({
  title, content
  })
  try {
    await page.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});



module.exports = router;
