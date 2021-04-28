const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  console.log(data);

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.utype = !isEmpty(data.utype) ? data.utype :"";
  data.mobile = !isEmpty(data.mobile) ? data.mobile :"";
  data.location = !isEmpty(data.location) ? data.location:"";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  if(Validator.isEmpty(data.mobile) || !Validator.isLength(data.mobile,{min:10,max:11})){
    errors.mobile = "Invalid Mobile NUmber";
  }

  if(Validator.isEmpty(data.utype)){
    errors.utype ="Invalid Utype";
  }

  if(Validator.isEmpty(data.location)){
    errors.location = "Invalid Location";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
