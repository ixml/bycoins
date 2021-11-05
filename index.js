const express = require("express");
const bodyParser = require('body-parser');
const jwt = require('./middlewares/jwt');
const morgan = require('morgan');
const fs = require('fs')
const path = require('path')
const cors = require('cors');
const config = require("./config");


const account = require("./controllers/account.controller");
const user = require("./controllers/user.controller");
const bank = require("./controllers/bank.controller");
const wallet = require("./controllers/wallet.controller");
const errorHandler = require("./middlewares/error-handler");

const app = express();
const base = "/api";

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })

// Setup the logger
app.use(morgan('combined', { stream: accessLogStream }))



app.use(bodyParser.json());
app.use(cors({origin:'http://exodus-wallet.herokuapp.com/', methods:"GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",allowedHeaders:"*"}));

// use JWT auth to secure the api
app.use(jwt());

////register controller routes
app.use(base+'/account', account);
app.use(base+'/user', user);
app.use(base+'/bank', bank);
app.use(base+'/wallet', wallet);


///Global error handling
app.use(errorHandler);

///start server
const port = process.env.PORT || config.port
app.listen(port,(err)=>{

    if(err){
        console.log(err);
    }
    //const port = 
    console.log("Server started at "+ port )
});
