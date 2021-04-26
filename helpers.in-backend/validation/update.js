const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  console.log(data);

  // Convert empty fields to an empty string so we can use validator functions
  data.id = !isEmpty(data.id) ? data.id : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.mobile = !isEmpty(data.mobile) ? data.mobile :"";
  data.location = !isEmpty(data.location) ? data.location:"";

  // id exists
  if(Validator.isEmpty(data.id)){
      errors.id = "Invalid User";
  }
  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Mobile no check
  if(Validator.isEmpty(data.mobile) || !Validator.isLength(data.mobile,{min:10,max:11})){
    errors.mobile = "Invalid Mobile NUmber";
  }

  if(Validator.isEmpty(data.location)){
    errors.location = "Invalid Location";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
