// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var app = express();

app.use(express.static(__dirname+'/views'));
app.set('views', __dirname + '/views');

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});
