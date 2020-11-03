const express = require('express');
const mongoose = require('mongoose');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth')
require('../config/passport')();

router.get('/',(req,res)=>{
    res.render('home',{title: "Home"})
})

router.get('/register',(req,res)=>{
    res.render('register',{title: "Register"})
})

router.post('/register',[
    body('userName')
    .isLength({min:1})
    .withMessage("Please enter user name"),
    body('email')
    .isLength({min:1})
    .withMessage('Please enter email'),
    body('password')
    .isLength({min:1})
    .withMessage("Please enter password")
    .custom((value,{req})=>{
        if (value !== req.body.confirmPassword){
            throw new Error('Password confirmation did not match password');
        }
        else{
            return true
        }
    })


],(req,res)=>{

    const {userName, email, password, confirmPassword} = req.body;

    const result = validationResult(req);
    console.log(result);
    if (result.isEmpty()){

        //register the user
        //check if monogodb has any errors

        const newUser = new User({userName,email,password});
        //hash password
        bcrypt.genSalt(10,(err,salt)=>
        bcrypt.hash(newUser.password,salt, 
            (error,hash)=>{
                if(error) throw error;

                newUser.password = hash;

                newUser.save()
                .then(()=>{
                    //redirect to login page 
                    //the user will have to use the new creditials to login
                   
                    req.flash('success_msg', 'Registration was successful, you can login with your creditials')
                    res.render('login', {title: "Login"});
                    console.log("user registered");
                    
                })
                .catch((err)=>{

                    //mongodb errors
                    //redirect to the register page and display the error
                    if (err.keyValue.userName){
                        req.flash('error_msg', 'Username already exists');
                    }
                    else{
                        req.flash('error_msg', 'Email was already used to create an account');
                    }
                    
                    res.redirect('/');
                    console.log(err);

                });

            }))

    }
    else{

        //express-validator errors
        //render page with error message
        const errors = result.errors;
        res.render('register',{title: "Register", errors,userName,email,password,confirmPassword});
    }    
})

router.get('/login',(req, res)=>{
    res.render('login', {title: "Login"});

})

router.post('/login',(req,res,next)=>{
    // need to check if what the user entered is 
    
    passport.authenticate('local',{successRedirect:'/loggedUser',
    failureRedirect:"/login",
    failureFlash:true})
    (req,res,next);

})

router.get('/loggedUser',ensureAuthenticated,(req,res)=>{
    res.render('loggedUser', {title: "Welcome", username: req.user.userName});
})

router.get('/logout',(req,res, next)=>{
    req.logOut();
    req.flash('success_msg','You are logged out');
    res.redirect('/');
})

router.get('/images',(req,res)=>{
 
    res.render("imageCredits",{title: "Credits"})

})
module.exports = router;