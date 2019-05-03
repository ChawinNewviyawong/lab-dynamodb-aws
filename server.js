var express = require('express');
var app = express();
var port = process.env.port || 3000;

var bodyParser = require('body-parser');
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', require('./router/index'));

app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});