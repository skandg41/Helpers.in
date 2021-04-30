const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
 const sendmsg = require("../../twilio");
// Load input validation
const validateCUpdateInput = require("../../validation/update");
const validateBookingInput = require("../../validation/booking");
// Load User model
const User = require("../../models/User");

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/update", (req, res) => {
  // Form validation

  const { errors, isValid } = validateCUpdateInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const id = req.body.id;
  const name = req.body.name;
  const mobile = req.body.mobile;
  const location = req.body.location;
  

  console.log("h");
  User.findOneAndUpdate({ _id: id },{$set:{name: name, mobile :mobile, location : location }},function(err,result){
   if (err) {return res.status(400).json({Error : err});}
   else{
     console.log("result id :"+result);
      res.json(result);
   }});
});

router.get("/fetchJobSeekers",(req,res) =>{
  User.find({utype:'JobSeeker'},{name:1,mobile:1,location:1,review:1,booking:1}).then(result =>{
    console.log(result);
    res.json(result);
  }).catch(error =>{
    console.log(error);
  })
})

router.post("/book",(req,res) =>{
    // Form validation

    const { errors, isValid } = validateBookingInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    var bookreq = { Bookerid:req.body.Booker, Status:"Requested" };
    User.findOneAndUpdate({ _id: req.body.target, utype:"JobSeeker" }, { $addToSet: { bookingRequests : bookreq } },
      function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
            sendmsg(success.mobile,"You received an job opportunity please update the status on app");
            res.status(200).json({msg:"Success"});
        }
    });
});


module.exports = router;
