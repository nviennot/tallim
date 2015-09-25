const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('dev'))
app.use(express.static('priv/static'))

// Add routes

const port = process.env.PORT || 3000
console.log(`Listening on port ${port}`)
app.listen(port)
