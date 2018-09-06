require('dotenv').config();
const express = require('express');
const port = 8000;
const app = express();
const r = require("./app/routes");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport')

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))


app.use(session({
  secret: 'opendata3wa rocks',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(flash());
app.use((req, res, next) => {
  app.locals.flashMessages = req.flash();
  next();
});
app.use(passport.initialize());
app.use(passport.session());


require('./app/passport')(passport);
r(app, passport)

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}`, { useNewUrlParser: true })
    .then(() => {
      app.listen(port, () => {
        console.log(`Le server a démarré sur http://localhost:${port}/`);
      });
    })
