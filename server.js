var express  = require('express');
var app      = express();

app.use('/assets', express.static(__dirname + '/app/assets'), function(req, res) {
    res.status(404).send("not found").end();
});
app.use('/lib', express.static(__dirname + '/lib'), function(req, res) {
    res.status(404).send("not found").end();
});
app.use('/js', express.static(__dirname + '/js'), function(req, res) {
    res.status(404).send("not found").end();
});
app.use('/views', express.static(__dirname + '/views'), function(req, res) {
    res.status(404).send("not found").end();
});
app.use('/images', express.static(__dirname + '/images'), function(req, res) {
    res.status(404).send("not found").end();
});
app.use('/fonts', express.static(__dirname + '/fonts'), function(req, res) {
    res.status(404).send("not found").end();
});
app.use('/css', express.static(__dirname + '/css'), function(req, res) {
    res.status(404).send("not found").end();
});

app.use('/favicon.ico', function(req, res) {
    res.sendfile('app/favicon.ico');
});

app.use('/*', function(req, res) {
    res.sendfile('index.html');
});


var server = app.listen(8001, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});