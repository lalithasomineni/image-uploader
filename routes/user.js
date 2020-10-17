const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/register",async (req,res)=>{
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password:req.body.password
  });
  const salt = await bcrypt.genSalt(14)
     newUser.password = await bcrypt.hash(newUser.password,salt);
      await newUser.save().then(result=>{
          res.json(result);
      }).catch(err=>{
       res.json(err);
      })

})

router.post("/login",(req,res)=>{
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "user not found"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "passwords don't match"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              username: user[0].username,
              userId: user[0]._id
            },
            process.env.APP_SECRET,
            {
                expiresIn: "7 days"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error:"user not found"
      });
    });
})
module.exports = router;
