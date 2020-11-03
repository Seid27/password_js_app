const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport')
const User = require('../model/User');

module.exports = ()=>{
    console.log("local strategy");
    passport.use(new LocalStrategy({usernameField: 'login'},
        (login,password,done)=>{
            
            User.findOne({$or:[{userName:login},{email:login}]}, (err,user)=>{
                if(err){return done(err)};

                if(!user){
                    // console.log("incorrect email or username");
                    return done(null,false,{message: "User is not registered"});
                }

                //check password
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) throw err;

                    if(isMatch){
                        console.log(user);
                        return done(null,user);

                    }else{
                        // console.log("incorrect password");
                        return done(null, false,{message: 'Incorrect password'});
                    }
                })
            })
            .catch((err)=>{
                //monogdb error
                return done(null, false,{message: err});
                // console.log(err);
            })
        }
    ));

    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=>{
        User.findById(id, (err, user)=> {
          done(err, user);
        });
      });
    
}