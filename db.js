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

const uri = 'mongodb://ipcam:ipcam0000@140.116.86.247:27017/calssifier'

mongoose.connect(uri)
