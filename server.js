'use strict';

const http = require('http');
const soap = require('soap');
const express = require('express');
const bodyParser = require('body-parser');

var myService = {
      MyService: {
          MyPort: {
              MyFunction: function(args) {
                  return {
                      name: args.name,
                      testParam: args.testParam
                  };
              }
          }
      }
  };

var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');

//http server example
var server = http.createServer(function(request,response) {
    response.end('404: Not Found: ' + request.url);
});

server.listen(8000);
soap.listen(server, '/wsdl', myService, xml);

//express server example
var app = express();

//body parser middleware are supported (optional)
app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));

app.listen(8001, function(){
    //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    soap.listen(app, '/wsdl', myService, xml);
});
