// load the key values pairs in the .env file as environment variables
require('dotenv').config()

const express = require('express')
const app = express()
const port = 8080
const expressLayouts = require('express-ejs-layouts')
const requestLogger = require('./middlewares/request_logger')
const methodOverride = require('method-override')
const db = require('./db') // implicit require index.js file
const session = require('express-session')
const setCurrentUser = require('./middlewares/set_current_user')
const ensureLoggedIn = require('./middlewares/ensure_logged_in')
const dishRouter = require('./routes/dish_router')
const homeRouter = require('./routes/home_router')
const sessionRouter = require('./routes/session_router')

app.set('view engine', 'ejs')

/*
                      http request
   +--------------------------------------------------+
   | POST /dishes                                     |
   | Host: localhost:8080                             |
   | Content-type: application/x-www-form-urlencoded  |
   |                                                  |
   | title=chips&image_url=chips.jpg&description=yum  |
   +--------------------------------------------------+
*/
//--------+
//        |
//        V
app.use(express.static('public'))
//        |
// override with POST method with method in query string ?_method=DELETE
app.use(methodOverride('_method'))
//        |
app.use(requestLogger)
//        V
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(setCurrentUser)

app.use(expressLayouts)
// parse the request body in the an object of key value pairs in req.body
app.use(express.urlencoded({ extended: true }))
//        |
//        V
app.use(sessionRouter)
app.use(homeRouter)
app.use(dishRouter)
//        |
//        |
// <------+ 404 route doesnt exist (show built in error page)


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

// database
// place to organise
// store the data, why not just a file?
// may database has more functionality?
// database is just another app - server - management system - dbms

// postgres
// relational database
// SQL database - speaks the language SQL

// psql
// psql commands \l \c \dt


// authencation
// password based login
// session
// cookie
