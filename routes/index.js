const express = require('express');
const mongoose = require('mongoose');
const User = require('../model/User');

const {body, validationResult} = require('express-validator/check');
const router = express.Router();

router.get('/',(req,res)=>{
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
    .withMessage("Please enter password"),
    body('confirmPassword')
    .isLength({min:1})
    .withMessage("Please confirm password")

],(req,res)=>{
    console.log(req.body);

    const errors = validationResult(req);
    if (errors.isEmpty()){
        //register the user
        //check if monogodb has any errors
        console.log("no errors");
    }
    else{
        console.log(errors);
    }


    // const user = new User(req.body);
    // user.save();
    
    console.log("user register");
})

router.get('/login',(req, res)=>{
    console.log("user login");
})
module.exports = router;