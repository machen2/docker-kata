const soap = require('soap');
const express = require('express');
const url = 'http://localhost:8001/wsdl?wsdl';
const args = {name: 'value'};

soap.createClient(url, function(err, client) {
    // client.MyFunction(args, function(err, result) {
    //     console.log(result);
    // });
    console.log('url ' + url);
    //console.log(client);
    //console.log('func ' + client['MyFunction']);

    if (err) {
        console.error("An error has occurred creating SOAP client: " , err);
    } else {
        // Log a description of the services the server offers.
        //var description = client.describe();
        //console.log("Client description:" , description);
        // Go on and call the method.
        //var MyFunction = client['check_username'];

        //, envelope, soapHeader
        client.MyFunction(args, function(err, result) {
            if(err) {
              console.log('Error' + err)
            } else {
              //console.log('Response Envelope: \n' + envelope);
              console.log('Result: \n' + JSON.stringify(result));
            }
        }, {timeout: 5000});
    }
});
