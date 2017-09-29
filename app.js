var express = require('express');
var engines = require('consolidate');
var app = express();
var bodyParser = require('body-parser');

// to support URL-encoded bodies
// bodyParser must go before the routes/controllers
app.use(bodyParser.urlencoded({
  extended: false
}));

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'));
app.use(require('./controllers'));

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.listen(app.get('port'), function() {
  console.log('Listening on port 5000...');
})
