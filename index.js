const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const {main} = require('./views')
const models = require('./models')

const app = express()
const PORT = 3000

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', (req, res, next) => {
  res.send(main())
})

const initialize = async () => {
  try {
    await models.db.authenticate()
    await models.db.sync({force: true})
    console.log('connected to the database')

    app.listen(PORT, () => {
      console.log(`Listening on Port ${PORT}`)
    })
  } catch (err) {
    console.log('Fatal Error: Cannot connect to database.', err)
  }
}

initialize()
