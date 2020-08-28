"use strict";

// const { response } = require('express');
var jsonServer = require('json-server');

var server = jsonServer.create();
var router = jsonServer.router('main.json');
var middlewares = jsonServer.defaults();

var path = require('path');

require('dotenv').config();

var port = process.env.PORT || 3000;

var cors = require('cors');

var bodyParser = require('body-parser');

var app = require('express')();

var sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.sendgrid);
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}); // const app = express()

app.get('/', function (req, res, next) {
  res.send({
    code: 200,
    message: "Welcome"
  });
}); // app.get('/', function(req, res){
//   res.sendFile(path.join(__dirname+'/public/index.html')
// )})

app.post('/email', function (request, response, next) {
  var message = request.body.message;
  var email = request.body.email;
  var subject = request.body.subject; // console.log(request.body.email);
  // console.log(request.body.message);
  // console.log(request.body.subject ?? 'Mo subject');

  if (email === null || message === null) {
    response.sendStatus(400);
  }

  var msg = {
    to: request.body.email,
    from: 'Green Horizon <greenhorizon@techbuzs.ml>',
    // Use the email address or domain you verified above
    subject: subject,
    text: request.body.message,
    html: "<strong> ".concat(request.body.email, "</strong>")
  };
  sgMail.send(msg).then(function (result) {
    response.sendStatus(200);
  })["catch"](function (err) {
    console.log(err);
    response.sendStatus(400);
  });
});
app.post('/emailtrans', function (request, response, next) {
  var name = request.body.name;
  var email = request.body.email;
  var subject = request.body.subject;
  var message = request.body.message; // console.log(request.body.email);
  // console.log(request.body.message);
  // console.log(request.body.subject ?? 'Mo subject');

  if (email === null || message === null) {
    response.sendStatus(400);
  }

  var msg = {
    templateId: 'd-66115f866cb44726b5482fd385b0186d',
    to: email,
    from: 'Greeneva <greenhorizon@techbuzs.ml>',
    // Use the email address or domain you verified above
    dynamicTemplateData: {
      subject: subject,
      name: "".concat(name, " "),
      message: message
    }
  };
  sgMail.send(msg).then(function (result) {
    response.sendStatus(200);
  })["catch"](function (err) {
    console.log(err);
    response.sendStatus(400);
  });
});
app.use('/api', server.use(middlewares), server.use(router)); // app.get("/status", function (request, response)  {
//     // if (request.query.nonce == null) {
//       response.send({
//         code: 200,
//         message: "Welcome"
//       })
//     // }
// })
// app.use('/status', response.send({code: 200,message: "online"}));
// server.use(middlewares);
// server.use(router);
// server.listen(port);

var serverp = app.listen(process.env.PORT || 8080, function () {
  console.log('listening on port %s...', serverp.address().port);
}); // console.log($port)