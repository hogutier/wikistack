const {addPage, main, wikiPage} = require('../views');
const router = require('express').Router();
const { Page } = require('../models');

router.get('/', (req, res, next) => {
  //res.send('Hello from Wiki!');
  res.send(main());
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  const {slug} = req.params;
  try {
    const page = await Page.findOne({
      where: {
        slug
      }
    })
    console.log(wikiPage(page, 'Daisy'))
    res.send(wikiPage(page, 'Daisy'));
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const {title, content, status} = req.body;
  console.log(JSON.stringify(req.body));
  const page = new Page({
  title, content, status
  })
  try {
    await page.save();
    res.redirect(`/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
