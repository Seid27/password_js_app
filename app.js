const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const flash = require('connect-flash');

//bodyparser
app.use(bodyParser.urlencoded({extended:true,}));

//ejs views middleware
app.use(expressLayouts);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//image file
app.use('/images', express.static(path.join(__dirname, 'images')))


console.log(path.join(__dirname, 'images'));


//express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

//connect to flash
app.use(flash());

//global variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//passport middleware
app.use(passport.initialize());
app.use(passport.session());



//routes middleware
app.use('/',routes);


module.exports = app;

