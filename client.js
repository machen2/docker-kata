const soap = require('soap');
const express = require('express');
const url = 'http://localhost:8001/wsdl?wsdl';
const args = {message: 'Cat'};

soap.createClient(url, function(err, client) {
    if (err) {
        console.error("An error has occurred creating SOAP client: " , err);
    } else {
        client.MyFunction(args, function(err, result) {
            if(err) {
              console.log('Error' + err)
            } else {
              console.log('Result: \n' + JSON.stringify(result));
            }
        }, {timeout: 5000});
    }
});
