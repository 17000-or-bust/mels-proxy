let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
const port = 8000;

let app = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log('Listening on port', port);
});
