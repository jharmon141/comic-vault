var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var serveStatic = require('serve-static');
var router = express.Router();
var app = express();
var path = require('path');
var requestify = require('requestify');
var history = require('connect-history-api-fallback');
app.use(history());
app.use(serveStatic(__dirname));
var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({
	extended: true,
}));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


router.use(function(req, res, next) {
    console.log("\nClient Connecting\n...".yellow);
    next(); // w/o this we'd be stuck in this router forevs.
});

app.route('/api/:name/:volume/:field').get(function(req,res) {
    let queryUrl = `
https://comicvine.gamespot.com/api/search/?api_key=276d60fcc927f730c4acdca149b5411bac84023c&query=${req.params.name}${','+req.params.volume}&resources=${req.params.field}&format=json
`
    console.log(queryUrl);
    requestify.get(queryUrl).then(function(response) {
        var data = (response.getBody());
        res.send(data);
    });
});

app.route('/issues/:id').get(function(req,res) {
    let queryUrl = `
https://comicvine.gamespot.com/api/issues/?api_key=276d60fcc927f730c4acdca149b5411bac84023c&filter=volume:${req.params.id}&format=json
`
    requestify.get(queryUrl).then(function(response) {
        var data = (response.getBody());
        res.send(data);
    });
});


app.route('/series/:name').get(function(req,res) {
    let queryUrl = `
https://comicvine.gamespot.com/api/volumes/?api_key=276d60fcc927f730c4acdca149b5411bac84023c&filter=name:${req.params.name}&format=json
`
    requestify.get(queryUrl).then(function(response) {
        var data = (response.getBody());
        res.send(data);
    });
});

app.listen(port);
console.log('server started '+port);
