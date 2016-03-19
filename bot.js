var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
    var request = JSON.parse(this.req.chunks[0]);
    var lowercase = (request.text).toLowerCase();
  if(request.text && lowercase.indexOf("sideways") > -1) {
    this.res.writeHead(200);
    this.res.writeHead(200);
    postMessage("Prashant");
    this.res.end();
  } else if (request.text && lowercase.indexOf(" RD ") > -1) {
    this.res.writeHead(200);
    this.res.writeHead(200);
    postMessage("Arti");
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}


function postMessage(text) {
  var botResponse, options, body, botReq;
  
  if(text.indexOf("Prashant") > -1){
    botResponse = "I am @Prashant and I sleep wrong"
    options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
    };
    
    body = {
    "bot_id" : botID,
    "text" : botResponse,
    "attachments" : [
          {
            "type" : "mentions",
            "loci":[[6,14]],
            "user_ids" : ["6842543"] // Change this to Prashant
          }
        ]
    };
  }
  
  if(text.indexOf("Arti") > -1){
    botResponse = "ITS SPELLED \"RD\" FOR THE LAST TIME!!";
    options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
    };
    
    body = {
    "bot_id" : botID,
    "text" : botResponse,
    };
  }

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
