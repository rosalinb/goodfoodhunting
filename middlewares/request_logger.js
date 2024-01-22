function logger(req, res, next) {
  console.log(`${new Date().toLocaleString()} ${req.method} ${req.url}`)
  next()
}

module.exports = logger
  
