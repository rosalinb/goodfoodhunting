
function ensureLoggedIn(req, res, next) {
  if (req.session.userId) {
    next()
  } else {
    res.send('sorry please logged in first')
  }
}

module.exports = ensureLoggedIn

