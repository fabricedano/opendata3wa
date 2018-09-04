module.exports = function(app) {
    app.get('/', function (req, res) {
        res.render('index')
      })
      
      app.get('/login', function (req, res) {
        res.render('login')
      })
      
      app.get('/register', function (req, res) {
        res.render('register')
      })
      app.post('/register', function (req, res) {
          console.log(req.body)
      })
}