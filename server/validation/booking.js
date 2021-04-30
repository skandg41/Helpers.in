const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateBookingInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.Booker = !isEmpty(data.Booker) ? data.Booker : "";
  data.target = !isEmpty(data.target) ? data.target : "";
  
  // id exists
  if(Validator.isEmpty(data.Booker)){
      errors.Booker = "Invalid User";
  }
  // Name checks
  if (Validator.isEmpty(data.target)) {
    errors.target = "Target Worker invalid";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
