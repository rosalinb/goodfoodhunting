// setup an currentUser object to available everywhere when an user is logged in

const db = require('../db')

function setCurrentUser(req, res, next) {
  res.locals.currentUser = {} // default to empty object
  res.locals.isLoggedIn = false

  // if user is not logged
  if (!req.session.userId) {
    return next()
  }
  
  // lets take to user id to the database
  // to fetch the user record
  const sql = `
    SELECT * FROM users WHERE id = $1;
  `

  db.query(sql, [req.session.userId], (err, result) => {
    if (err) {
      console.log(err)
    }
    
    // set current user 
    let user = result.rows[0] // { id: 5, email: 'dt@ga.co', }

    res.locals.currentUser = user
    res.locals.isLoggedIn = true
    next()
  })

}

module.exports = setCurrentUser