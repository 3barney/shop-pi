/*eslint-disable no-console*/

require('dotenv').load();
import express from 'express';
import bodyParser from 'body-parser';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let allowCrossOrigin = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE,OPTIONS,HEAD");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization");
    next();
};
app.use(allowCrossOrigin);

app.get('/', function(req, res) {
  res.json("Welcome to the universe");
});

const port = +process.env.PORT || 6060;
const server = app.listen(port, "localhost" , () => {
    const {address, port} = server.address();
    console.log("Listening on http://localhost:" + port);
});
