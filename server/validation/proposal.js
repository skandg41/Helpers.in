const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateProposalInput(data) {
  let errors = {};

  console.log(data);
  
  // Convert empty fields to an empty string so we can use validator functions
  data.JobSeeker = !isEmpty(data.JobSeeker) ? data.JobSeeker : "";
  data.customer = !isEmpty(data.customer) ? data.customer : "";
  data.response = !isEmpty(data.response) ? data.response : "";

  // id exists
  if(Validator.isEmpty(data.JobSeeker)){
      errors.JobSeeker = "Invalid User";
  }
  // Name checks
  if (Validator.isEmpty(data.customer)) {
    errors.customer = "customer Worker invalid";
  }
  
  if (Validator.isEmpty(data.response) && data.response ){
      errors.response = "response invalid";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
