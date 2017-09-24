const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const pyshell = require('python-shell')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/:id', (req, res) => {
  const id = req.params.id
  fs.createReadStream(`/home/server/FR_AMI_git/web_pic/$pic_${id}.png`).pipe(res)
})

app.get('/script.js', (req, res) => {
  fs.createReadStream('./script.js').pipe(res)
})

app.get('/', (req, res) => {
  fs.createReadStream('./index.html').pipe(res)
})

app.post('/signal', (req, res) => {
  const data = {
    path: '/img/',
    names: ['img1', 'img2', 'img3'],
  }
  res.json(data)
})

app.listen(3000)
