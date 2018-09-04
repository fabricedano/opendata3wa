const express = require('express');
const port = 8000;

let app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

/*app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Hello World !');
});*/

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/login', function (req, res) {
  res.render('login')
})

app.get('/register', function (req, res) {
  res.render('register')
})

app.listen(port, () => {
  console.log(`Le server a démarré sur http://localhost:${port}/`);
});
