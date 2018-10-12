'use strict';

const http = require('http');
const soap = require('soap');
const express = require('express');
const bodyParser = require('body-parser');

var myService = {
      MyService: {
          MyPort: {
              MyFunction: function(args) {
                  if(args.message === 'Cat') {
                    return {
                      message: 'MEOW!'
                    }
                  } else {
                    return {
                        message: 'WOOF :('
                    }
                  }
              }
          }
      }
  };

var xml = require('fs').readFileSync('./myService.wsdl', 'utf8');

//express server example
var app = express();

//body parser middleware are supported (optional)
app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));

app.listen(8001, function(){
    //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    soap.listen(app, '/wsdl', myService, xml);
});
