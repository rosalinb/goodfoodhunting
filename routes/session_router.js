const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')


router.get('/login', (req, res) => {
  res.render('login')
})
//        |
//        V
router.post('/login', (req, res) => {

  const sql = `
    SELECT * FROM users
    WHERE email = '${req.body.email}';
  `

  // 1. check if user exists in the database via email address
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      res.render('login')
      return
    }

    if (result.rows.length === 0) {
      console.log('user not found')
      res.render('login')
      return 
    }

    const plainTextPass = req.body.password
    const hashedPass = result.rows[0].password_digest

    // 2. check password
    bcrypt.compare(plainTextPass, hashedPass, (err, isCorrect) => {

      if (!isCorrect) {
        console.log('password doesnt match')
        res.render('login')
        return
      }

      // yay, you're good to go
      // session is an object
      // we're adding a new key value
      // we came up with the name for the key, which is userId
      req.session.userId = result.rows[0].id
      res.redirect('/')
    })

  })
})
//        |
//        V
router.delete('/logout', (req, res) => {
  req.session.userId = null
  res.redirect('/login')
})

module.exports = router