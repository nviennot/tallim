var express = require('express')
var morgan = require('morgan')
var app = express()

app.use(morgan('dev'))
app.use(express.static('priv/static'))

// Add routes

console.log("Listening on port 3000")
app.listen(3000)
