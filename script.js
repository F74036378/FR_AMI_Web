let currentImgId = 0
let path = null
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

$('button#next-img').click(function() {
  currentImgId++
  $('img#image').attr('src', path + currentImgId)
  $('p#image-name').text(names[currentImgId - 1])
})
