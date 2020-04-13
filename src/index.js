const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.set('views', __dirname+'/views');

app.use(require('./routes'));

app.listen(8081 , () => {
  console.log('rodando');
  
});