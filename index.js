require('dotenv').config();
const express = require('express');
const port = 8000;
const app = express();
const r = require("./app/routes");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))

r(app);
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}`, { useNewUrlParser: true })
    .then(() => {
      app.listen(port, () => {
        console.log(`Le server a démarré sur http://localhost:${port}/`);
      });
    })