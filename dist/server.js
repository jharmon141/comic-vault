var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var serveStatic = require('serve-static');
var router = express.Router();
var app = express();
var path = require('path');
var requestify = require('requestify');
var history = require('connect-history-api-fallback');
app.use(serveStatic(__dirname));
app.use(history());
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
https://comicvine.gamespot.com/api/search/?api_key=276d60fcc927f730c4acdca149b5411bac84023c&query=${req.params.name}${','+req.params.volume}&resources=${req.params.field}&limit=10&format=json
`
    requestify.get(queryUrl).then(function(response) {
        var data = (response.getBody());
        res.send(data);
    });
});

app.listen(port);
console.log('server started '+port);
