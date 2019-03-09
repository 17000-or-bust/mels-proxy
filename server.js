require('newrelic');
let express = require('express');
let compress = require('compression');
const port = 8000;

let app = express();
app.use(compress());
app.use(express.static(__dirname + '/public'));

let proxy = require('http-proxy-middleware');

app.use(
  '/overview/:restaurantId',
  proxy({
    target: 'http://localhost:3000',
    changeOrigin: true
  })
);

let morgan = require('morgan');
app.use(morgan('dev'));
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/:id', express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log('Listening on port', port);
});
