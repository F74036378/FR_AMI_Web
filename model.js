const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dataSchema = new Schema({}, { timestamps: true })

const Data = mongoose.model('Data', dataSchema)

module.exports = Data
