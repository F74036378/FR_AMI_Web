const mongoose = require('mongoose')

// connect to db
mongoose.Promise = global.Promise
const connection = mongoose.connection

connection.on('error', err => {
  console.log(err)
})

connection.once('open', () => {
  console.log('Connect to mongodb success')
})

const uri = 'mongodb://127.0.0.1:27017/web_demo'

mongoose.connect(uri)
