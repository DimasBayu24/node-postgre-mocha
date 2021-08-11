const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.NODE_ENV === 'prod' ? 7000 : 7000;
const route = require('./src/route')
const logger = require('morgan')


app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(bodyParser.json());
app.use(logger('dev'));

app.listen(port, () => {
    console.log("Server running on port ", port);
  
});
app.use('/api',route)

module.exports = app