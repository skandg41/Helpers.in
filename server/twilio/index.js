const logger = require('../logger');
function sendmsg(number,msg){
  console.log(process.env.accountSid);
  const accountSid = process.env.accountSid; 
  const authToken = process.env.authToken; 
  console.log(accountSid);
  console.log(authToken);
  const client = require('twilio')(accountSid, authToken); 
  
  client.messages 
        .create({ 
           body: msg,  
           messagingServiceSid: process.env.messagingServiceSid,      
           to: '+91'+number 
         }) 
        .then(message => logger.info("SMS "+ msg +" send to "+number + " sid "+message.sid))
        .catch(err => logger.err("Error in twilio module",{err:err}))
 }

module.exports = sendmsg;
