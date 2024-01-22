require('dotenv').config()

const bcrypt = require('bcrypt')
const db = require('./index.js')

const email = 'dt@ga.co'
const plaintextPass = 'pudding'
const saltRound = 10

// 1. generate the salt
bcrypt.genSalt(saltRound, (err, salt) => {

  // 2. hash the plain text password
  bcrypt.hash(plaintextPass, salt, (err, hashedPass) => {

    const sql = `
      INSERT INTO users 
      (email, password_digest)
      VALUES 
      ('${email}', '${hashedPass}')
      RETURNING id;
    `
    // 3. insert a new user record to database    
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log('user created!')
        console.log(result.rows)
      }
    })

  })

})





