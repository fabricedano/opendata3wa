const User = require('./models/User.models')

module.exports = function(app, passport) {
     // Ce petit middleware met à disposition des variables pour toutes les 'views' Pug de l'application
	app.use((req, res, next) => {
    app.locals.user = req.user // Récupération de l'objet 'user' (sera existant si une session est ouverte, et undefined dans le cas contraire)
    next()
  })
  
  app.get('/', function (req, res) {
      res.render('index')
    })
    
  app.get('/login', function (req, res) {
    req.flash('danger', 'Oops ! erreur fatale.')
    res.render('login')
  })

  // Lorsqu'on tente de se connecter, c'est le middleware de passport qui prend la main, avec la stratégie "locale" (configurée dans ./passport.js )
  app.post('/login', passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      badRequestMessage: 'Identifiants nons valides!',
      failureFlash: true,
      successFlash: { message: 'Connexion réussie. Bienvenue !' }
  }))
    
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