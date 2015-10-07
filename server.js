var express  = require('express');
var app      = express();

app.use('/assets', express.static(__dirname + '/app/assets'), function(req, res) {
    res.status(404).send("not found").end();
});

app.use('/swagger-api-editor', express.static(__dirname + '/node_modules/swagger-editor-src/dist/'), function(req, res) {
    res.status(404).send("not found").end();
});

app.use('/favicon.ico', function(req, res) {
    res.sendfile('app/favicon.ico');
});

app.use('/*', function(req, res) {
    res.sendfile('app/index.html');
});


var server = app.listen(8001, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});