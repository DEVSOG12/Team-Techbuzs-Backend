// const { response } = require('express');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('main.json');
const middlewares = jsonServer.defaults();
const path = require('path');

const port = process.env.PORT || 3000;
const cors =require('cors');
const bodyParser = require('body-parser');
var app = require('express')();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('API_KEY_SENDGRID');

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  next();
})
// const app = express()
app.get('/', function(req, res,next) {res.  send({
    code: 200,
    message: "Welcome"
  }) });
// app.get('/', function(req, res){
//   res.sendFile(path.join(__dirname+'/public/index.html')
// )})

  app.post('/email', function(request, response, next) {
      var message = request.body.message;
      var email = request.body.email;
      var subject = request.body.subject;
      // console.log(request.body.email);
      // console.log(request.body.message);
      // console.log(request.body.subject ?? 'Mo subject');

      if(email === null ||message === null ){
        response.sendStatus(400);
        }
        
      const msg = {
        to: request.body.email,
        from: 'Green Horizon <greenhorizon@techbuzs.ml>', // Use the email address or domain you verified above
        subject: subject,
        text: request.body.message,
        html: `<strong> ${request.body.email}</strong>`,
      };
      sgMail.send(msg)
      .then(result => {
        response.sendStatus(200)

      })
      .catch(err => {
        console.log(err)
        response.sendStatus(400)
      })
    
  })
app.use('/api', server.use(middlewares), server.use(router));
// app.get("/status", function (request, response)  {
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
const serverp = app.listen(process.env.PORT || 8080, ()=>     {console.log('listening on port %s...', serverp.address().port)}
)
// console.log($port)