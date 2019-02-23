let express = require('express');
const port = 8000;

let app = express();
app.use(express.static(__dirname + '/public'));

let proxy = require('http-proxy-middleware');
app.use(
  '/api/reserve',
  proxy({
    target: 'http://ec2-18-191-229-0.us-east-2.compute.amazonaws.com',
    changeOrigin: true
  })
);
app.use(
  '/api/photos',
  proxy({
    target: 'http://ec2-18-206-121-61.compute-1.amazonaws.com',
    changeOrigin: true
  })
);
app.use(
  '/menu',
  proxy({ target: 'http://localhost:3030', changeOrigin: true })
);
// app.use('/overview', proxy({ target: 'http://localhost:3000', changeOrigin: true }));
// app.use('/overview', proxy({ target: 'http://localhost:3000', changeOrigin: true }));

let morgan = require('morgan');
app.use(morgan('dev'));
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log('Listening on port', port);
});
