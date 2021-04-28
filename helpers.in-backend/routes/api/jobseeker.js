const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

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
  

  console.log("h");
  User.findOneAndUpdate({ _id: id },{$set:{name: name, mobile :mobile, location : location }},function(err,result){
   if (err) {return res.status(400).json({Error : err});}
   else{
     console.log("result id :"+result);
      res.json(result);
   }});
});

router.post("/fetchJobProposals",(req,res) =>{
  console.log(req.body._id);
  const user = req.body._id;
  User.findOne({_id: user, utype:'JobSeeker'},{_id:0,bookingRequests:1}).then(result =>{
    console.log(result.bookingRequests);
    res.json(result.bookingRequests);
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
        console.log(result);
        res.status(200).json("Success");
      }
  });
});
module.exports = router;