let currentImgId = 0000
let path = /img/
let names = null

const data = 123

$('button#get-data').click(function() {
  $.ajax({
    url: '/signal',
    method: 'POST',
    data: data,
  }).done(function(data) {
    path = data.path
    names = data.names
  })
})

$('#get-datasets').click(function(){
  $.ajax({
    url:'/get-data',
    method: 'POST'
  }).done(function(data) {

  })
})

$('#train-datasets').click(function(){
  $.ajax({
    url:'/train-data',
    method: 'POST'
  }).done(function(data) {
    
  })
})

$('button#next-img').click(function() {
  console.log(path + currentImgId)
  $('img#image').attr('src', path + currentImgId)
  currentImgId++
})
