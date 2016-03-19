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
  } else if (request.text && lowercase.indexOf("arti") > -1) {
    this.res.writeHead(200);
    this.res.writeHead(200);
    postMessage("Arti");
    this.res.end();
  } else if (request.text && lowercase.indexOf("story time!") > -1) {
    this.res.writeHead(200);
    this.res.writeHead(200);
    postMessage("Story");
    this.res.end();
  } else if (request.text && lowercase.indexOf("milk gain") > -1) {
    this.res.writeHead(200);
    this.res.writeHead(200);
    postMessage("Sri");
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
            "loci":[[5,11]],
            "user_ids" : ["19836550"] // Change this to Prashant
          }
        ]
    };
  } else if(text.indexOf("Arti") > -1){
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
  } else if(text.indexOf("Story") > -1){
    botResponse = "Chup Chup Besi Ja!!";
    options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
    };
    
    body = {
    "bot_id" : botID,
    "text" : botResponse,
    };
  } else if(text.indexOf("Sri") > -1){
    botResponse = "Dudu Gainz";
    options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
    };
    
    body = {
    "bot_id" : botID,
    "attachments" : [
          {
            "type" : "image",
            "url" : "https://i.groupme.com/540x960.png.b64be84c1a0f4b56945ffcb94dba035f.large"
          }
        ]
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
