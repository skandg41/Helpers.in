const logger = require('../logger');
function sendmsg(number,msg){

  const accountSid = 'AC1a6757b28d8774d8318faa99b283a818'; 
  const authToken = '49fca941ec666b28a07e26866b2730d3'; 
  const client = require('twilio')(accountSid, authToken); 
  client.messages 
        .create({ 
           body: msg,  
           messagingServiceSid: 'MG2a7083937a868884d10d77d2740335d7',      
           to: '+91'+number 
         }) 
        .then(message => logger.info("SMS "+ msg +" send to "+number + " sid "+message.sid)) 
        .done();
 }

module.exports = sendmsg;
