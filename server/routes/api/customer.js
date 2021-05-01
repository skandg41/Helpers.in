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
const logger = require("../../logger");
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
  
  User.findOneAndUpdate({ _id: id },{$set:{name: name, mobile :mobile, location : location }},function(err,result){
   if (err) {
    logger.error("Error in update",{err:err}); 
    return res.status(400).json({Error : err});}
   else{
      res.json(result);
      logger.info('handled request',{req,res});
   }});
});

router.post("/fetchJobSeekers",(req,res) =>{
  User.find({utype:'JobSeeker'},{name:1,mobile:1,location:1,review:1,booking:1}).then(result =>{
    res.json(result);
    logger.info('handled request',{req,res});
  }).catch(error =>{
    logger.error("Error in fetchjobSeekers",{err:error});
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
          logger.error("Error in book",{err:error});
        } else {
            sendmsg(success.mobile,"You received an job opportunity please update the status on app");
            res.status(200).json({msg:"Success"});
            logger.info('handled request',{req,res});
        }
    });
});
module.exports = router;
