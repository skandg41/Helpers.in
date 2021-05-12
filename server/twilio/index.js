const logger = require('../logger');
function sendmsg(number,msg){

  const accountSid = 'twilio account sid here'; 
  const authToken = 'twilio auth token here'; 
  const client = require('twilio')(accountSid, authToken); 
  client.messages 
        .create({ 
           body: msg,  
           messagingServiceSid: 'twilio message service sid here',      
           to: '+91'+number 
         }) 
        .then(message => logger.info("SMS "+ msg +" send to "+number + " sid "+message.sid))
        .catch(err => logger.err("Error in twilio module",{err:err}))
 }

module.exports = sendmsg;
