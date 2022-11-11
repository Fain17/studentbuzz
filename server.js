require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const commonRoutes = require('./routes/common')
const facultyRoutes = require('./routes/faculty')
const studentRoutes = require('./routes/student')
const uniRoutes = require('./routes/uni')
const mongoose = require('mongoose')
var cors = require('cors')

const app = express()
app.use(cors())
//middleware
app.use(morgan('dev'));
app.use(express.json())

//routes
app.use('/api/faculty', facultyRoutes)
app.use('/api/student', studentRoutes)
app.use('/api/uni', uniRoutes)
app.use('/api', commonRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
})
.catch((err) => {
console.log(err)
}) 