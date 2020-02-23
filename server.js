const express = require("express");
const axios = require("axios");
require("dotenv").config()
const CircularJSON = require("circular-json");
var app = express();
const port = process.env.PORT

app.use(express.json())

// Database start code

var knex = require("./Model/Tables")


// Task One :)

var currencyM_data = express.Router();
app.use("/", currencyM_data);
require("./Controllers/CurrencyMetadata")(currencyM_data, knex, axios, CircularJSON);

// Task Two :)

var tickerM_data = express.Router();
app.use("/", tickerM_data);
require("./Controllers/TickerMetadata")(tickerM_data, knex, axios, CircularJSON)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))