const express = require('express');
const port = 8080;
const path = require('path');
const routes = require('./routes')
const mongodb = require('./config/mongo');
const app = express();
app.use(express.urlencoded());

app.use('/', routes);


mongodb.dbConnection.then(() => app.listen(port, () => {
    console.log("Server is running!")
}))