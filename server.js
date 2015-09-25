const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('dev'))
app.use(express.static('priv/static'))

// Add routes

console.log("Listening on port 3000")
app.listen(3000)
