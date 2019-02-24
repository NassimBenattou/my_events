var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const mysql = require("mysql");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "test",
    database: "my_events"
});

app.post('/user_connect', function (req, res) {

    console.log(req.body.data.name);

    var data = [
        [
        req.body.data.id_user, 
        req.body.data.name, 
        req.body.data.email, 
        req.body.data.picture
        ],
    ];
    
    connection.query("INSERT INTO users (id_user, name, email, picture) VALUES ?", [data], function(err, result){
    console.log('ok');
    })
})
  
app.listen(5000, function () {
    console.log('Server connected on port 5000')
})