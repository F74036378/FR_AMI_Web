const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const pyshell = require('python-shell')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/img/:id', (req, res) => {
  const id = req.params.id
  fs.createReadStream(`../web_pic/pic_${id}.png`).pipe(res)
})

app.get('/script.js', (req, res) => {
  fs.createReadStream('./script.js').pipe(res)
})

app.get('/', (req, res) => {
  fs.createReadStream('./index.html').pipe(res)
})

app.post('/get-data', (req, res) => {
  var options = {
  mode: 'text',
  pythonOptions: ['-u'],
  scriptPath: '../',
  }

  pyshell.run('datasets_downloader.py', options, function (err, results) {
  if (err) throw err;
    //results is an array consisting of messages collected during execution 
    console.log('finish')
    res.json('return')
  })
})

app.post('/train-data', (req, res) => {
  var options = {
  mode: 'text',
  pythonOptions: ['-u'],
  scriptPath: '../',
  args: ['../../../FR_AMI_ser/train_dataset/', '../../../FR_AMI_ser/models_now/20170511-185253/', '/home/server/FR_AMI_ser/classifier_new/classifier.pkl']
  }
  console.log('start train')
  pyshell.run('Classifier_Training_Executive_v2.py', options, function (err, results) {
  // results is an array consisting of messages collected during execution 
    console.log('finish_train')
    options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: '../',
    args: ['/home/server/FR_AMI_ser/classifier_new/classifier.pkl']
    }
    console.log('start update')
    pyshell.run('classifier_uploader.py', options, function (err, results){
      if(err){
        console.log(err)
      }else{
        console.log('update success')
      }
      res.json('return')
    })
  })
})

app.post('/signal', (req, res) => {
  const data = {
    path: '/img/',
    names: ['img1', 'img2', 'img3'],
  }
  res.json(data)
})

app.post('/readf', (req, res) => {
  ret = {
    nali:{},
    dict:{}
  }
  fs.readFile('./name.json', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = JSON.parse(data)
    ret.nali = data
    fs.readFile('../web_pic/log.json', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = JSON.parse(data)
      ret.dict = data
      res.json(ret)
    });
  });
})

app.post('/save', (req, res) =>{
  console.log(req.body)
  var options = {
  mode: 'text',
  pythonOptions: ['-u'],
  scriptPath: '../',
  args : [JSON.stringify(req.body), '../web_pic/', '../../../FR_AMI_ser/train_dataset/']
  }

  pyshell.run('train_dataset_newer.py', options, function (err, results) {
  if (err) throw err;
    //results is an array consisting of messages collected during execution 
    console.log(results)
    res.json('return')
  })
})

app.listen(3000)
