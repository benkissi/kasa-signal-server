const express = require('express')
var cors = require("cors");

const routes = require('./routes')

const app = express()
app.use(routes)
app.use(cors)


module.exports = app