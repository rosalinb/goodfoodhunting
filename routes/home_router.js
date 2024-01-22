const express = require('express')
const router = express.Router()
const db = require('../db')


router.get('/', (req, res) => {
  console.log(req.session.userId)
  db.query('SELECT * FROM dishes;', (err, result) => {
    if (err) {
      console.log(err)
    }

    let dishes = result.rows

    res.render('home', { dishes: dishes })
  })  
})

module.exports = router