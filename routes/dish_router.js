const express = require('express')
const router = express.Router()
const db = require('../db')
const ensureLoggedIn = require('../middlewares/ensure_logged_in')


router.get('/dishes', (req, res) => {

  db.query('SELECT * FROM dishes;', (err, result) => {
    if (err) {
      console.log(err)
    }

    let dishes = result.rows

    res.render('index', { dishes: dishes })
  })

})
//        |
//        V
router.get('/dishes/new', ensureLoggedIn, (req, res) => {
  res.render('new_dish_form')
})
//        |
//        V
router.get('/dishes/:id', (req, res) => {

  let id = req.params.id

  db.query(`select * from dishes where id = $1;`, [id], (err, result) => {
    if (err) {
      console.log(err)
    }
    let dish = result.rows[0]
    res.render('info', { dish: dish })
  })  
})
//        |
//        V
router.delete('/dishes/:id', ensureLoggedIn, (req, res) => {
  // delete dish from database
  const sql = `
    DELETE FROM dishes WHERE id = $1 RETURNING *;
  `

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log(err)
    }

    console.log(result.rows)

    res.redirect('/dishes')
  })
})
//        |
//        V
router.post('/dishes', ensureLoggedIn, (req, res) => {
  // expect to have the title, image_url, description from the client
  // save it in the database
  console.log(req.body)

  let title = req.body.title
  let imageUrl = req.body.image_url
  let description = req.body.description
  let userId = req.session.userId

  const sql = `
    INSERT INTO dishes (title, image_url, description, user_id) 
    values ($1, $2, $3, $4);
  `

  db.query(sql, [title, imageUrl, description, userId], (err, result) => {
    if (err) {
      console.log(err)
    }

    // res.send('success!!!!') // we are lying to our clients
    // instead of sending a response here, redirect to a safe route
    res.redirect('/dishes') // redirects are using get methods - get /dishes
  })

})

router.get('/dishes/:id/edit', (req, res) => {

  const sql = `
    SELECT * FROM dishes
    WHERE id = $1;
  `

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log(err)
    }

    let dish = result.rows[0]
    res.render('edit_dish_form', { dish: dish })
  })
})

router.put('/dishes/:id', (req, res) => {

  let title = req.body.title
  let imageUrl = req.body.image_url
  let description = req.body.description

  const sql = `
    UPDATE dishes
    SET 
      title = $1, 
      image_url = $2, 
      description = $3
    WHERE id = $4;
  `

  db.query(sql, [title, imageUrl, description, req.params.id], (err, result) => {
    if (err) {
      console.log(err)
    }
    res.redirect(`/dishes/${req.params.id}`)
  })

})

module.exports = router