//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');                 //path is a python standard lib

//call the express method to get the app handler
var app = express();

//all routes are placed here
const route = require('./routes/route');

//Connect to mongodb with optional parameters
let param = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}; 
mongoose.connect('mongodb://localhost:27017/contactlist', param);
mongoose.connection.on('connected', ()=>{
    console.log('Successfully connected at mongo db contact list on port 27017');
});
mongoose.connection.on('error', (err)=>{
    if(err)
        console.log('There is some error while connecting : ' + err);
});

//set port
const port = 3000;

//Adding middleware - cors 
app.use(cors());                            //cors is used here to transfer from default port 27017 to 3000

//body - parser
app.use(bodyparser.json());

//routes                 
app.use('/api',route);

// testing server
app.get('/', (req, res) => {
    res.send('You are in home page !');
});

//listen method
app.listen(port, function(){
    console.log('Server running on port : ' + port);
});
