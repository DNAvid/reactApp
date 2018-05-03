const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware")
var fs = require('fs');
// key not synched on git
var key = fs.readFileSync('/etc/letsencrypt/archive/dev.dnavid.com/privkey1.pem');
var cert = fs.readFileSync('/etc/letsencrypt/archive/dev.dnavid.com/fullchain1.pem');
var https = require('https');
var http = require('http');
var express = require('express');
var serveStatic = require('serve-static')
var https_options = {
	key: key,
	cert: cert
};

var PORT = 443;
var HOST = '0.0.0.0';
app = express();

const config = require('/home/davidweisss/reactApp/webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
                public: 'reactapp.cloud:443',
                host: '0.0.0.0',
                port: 443,
                contentBase: 'src/client/',
                compress: true,
		hot:true
        }
));
app.use(webpackHotMiddleware(compiler));

app.get('/', function (req, res) {
	res.sendFile('/home/davidweisss/reactApp/src/client/index.html')
})

app.get('/public/bundle.js', function (req, res) {
	res.sendFile('/home/davidweisss/reactApp/src/client/public/bundle.js')
})

app.get('/*', function (req, res) {
	res.sendFile('/home/davidweisss/reactApp/src/client/index.html')
})


server = https.createServer(https_options, app).listen(PORT, HOST);
console.log('HTTPS Server listening on %s:%s', HOST, PORT);
// Redirect from http port 80 to https
var http = require('http');
http.createServer(function (req, res) {
	res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
	res.end();
}).listen(80);
