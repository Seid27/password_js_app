const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({extended:true,}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// app.engine('jsx', require('express-react-views').createEngine())

app.use('/',routes);


module.exports = app;

