const User = require('./models/User.models')

module.exports = function(app) {
    app.get('/', function (req, res) {
        res.render('index')
      })
      
      app.get('/login', function (req, res) {
        req.flash('danger', 'Oops !')
        res.render('login')
      })
      
      app.get('/register', function (req, res) {
        res.render('register')
      })
      app.post('/register', function (req, res) {
        User.register(
          req.body.firstname,
          req.body.lastname,
          req.body.email,
          req.body.pwd1,
          req.body.pwd2,
        ).then(() => {
          req.flash('success', 'Inscription réussie ! Vous pouvez maintenant vous connecter.')
          res.redirect('/')
        })
        .catch(errors => {
          res.render('register', { errors, user: req.body })
        })
      })
}