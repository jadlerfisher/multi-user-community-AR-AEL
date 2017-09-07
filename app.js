var express = require('express');
var engines = require('consolidate');
var app = express();

app.set('port', (process.env.PORT || 3000))
app.use(express.static(__dirname + '/public'));
app.use(require('./controllers'));

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.listen(app.get('port'), function() {
  console.log('Listening on port 3000...');
})
