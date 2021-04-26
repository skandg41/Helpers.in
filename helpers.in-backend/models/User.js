const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  utype:{
    type: String,
    enum: ['Customer', 'JobSeeker', 'Admin'],
    required: true,
  },
  mobile:{
    type: Number,
    required: true,
  },
  location:{
    type:String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  review: [{
    title:{
      type:String,
      required: true
    },
    rating:{
      type:Number,
      min:0,
      max:10
    }
  }],
  bookingRequests: [{
    Bookerid:{
      type:String,
      required: true
    },
    DateofReq:{
      type:Date,
      default: Date.now
    },
    Status:{
      type: String,
    }
  }]
});

module.exports = User = mongoose.model("users", UserSchema);
