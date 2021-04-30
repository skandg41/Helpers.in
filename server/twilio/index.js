function sendmsg(number,msg){

  const accountSid = 'AC1a6757b28d8774d8318faa99b283a818'; 
  const authToken = 'd79c0275205b8dc5bf134b87fa37df41'; 
  const client = require('twilio')(accountSid, authToken); 
   console.log("msg : ", msg);
   console.log("to : ", number);
  client.messages 
        .create({ 
           body: msg,  
           messagingServiceSid: 'MG2a7083937a868884d10d77d2740335d7',      
           to: '+91'+number 
         }) 
        .then(message => console.log(message.sid)) 
        .done();
 }

module.exports = sendmsg;
