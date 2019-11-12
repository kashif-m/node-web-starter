
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// passport authorization
app.use(passport.initialize())
require('./config/passport')(passport)

// connection to database
mongoose.set('useFindAndModify', false)
const db = require('./config/keys.js').mongoURI
mongoose
  .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to mongoDB.'))
  .catch(err => console.log(err))

// host
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}.`))
