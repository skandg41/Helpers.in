const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const logger = require("../../logger");
// Load input validation
const validateCUpdateInput = require("../../validation/update");
const validateProposalInput = require("../../validation/proposal");
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
  
  User.findOneAndUpdate({ _id: id },{$set:{name: name, mobile :mobile, location : location }},function(err,result){
   if (err) {return res.status(400).json({Error : err});}
   else{
      res.json(result);
      logger.info('handled request',{req,res});
   }});
});

router.post("/fetchJobProposals",(req,res) =>{
  const user = req.body._id;
  User.findOne({_id: user, utype:'JobSeeker'},{_id:0,bookingRequests:1}).then(result =>{
    res.json(result.bookingRequests);
    logger.info('handled request',{req,res});
  }).catch(err => res.status(400).json(err));
})

router.post("/proposals", (req, res) => {
  // Form validation

  const { errors, isValid } = validateProposalInput(req.body);
  
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const JobSeeker = req.body.JobSeeker;
  const Customer = req.body.customer;
  const response = req.body.response==="Accept" ? 'Confirmed' : 'Rejected';
  
  User.updateMany({'bookingRequests.Bookerid': Customer}, {'$set': {
    'bookingRequests.$.Status': response }}, function(err,result) {
      if(err) res.status(400).json(err);
      else {
        res.status(200).json("Success");
        logger.info('handled request',{req,res});
      }
  });
});
module.exports = router;