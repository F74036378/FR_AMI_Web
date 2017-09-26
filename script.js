let dictionary = {}
let name_list = {}
let currentID = 0
let path = /img/
let names = null
let nrof_pic = 0

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
    console.log('sd')
    $.ajax({
      url:'readf',
      method:'POST'
    }).done(function(data){
      dictionary = data.dict
      name_list = data.nali
      nrof_pic = Object.keys(dictionary.name).length
      var x = document.getElementById("user-select");
      for (i=0;i<name_list.name.length;i++){
        var option = document.createElement("option");
        option.id = name_list.name[i];
        option.text = name_list.name[i];
        x.add(option);
      }
      if(nrof_pic != 0){
        $('#image').attr('alt', currentID);
        $('#image').attr('src', path+currentID);
        $('select option[id='+dictionary.name[currentID] +']').attr("selected",true);
      }
    })
  })

})

$('#train-datasets').click(function(){
  $.ajax({
    url:'/train-data',
    method: 'POST'
  }).done(function(data) {})
})


$('button#next-img').click(function() {
  if(nrof_pic != 0){
    var x = document.getElementById('user-select');
    var y = x.selectedIndex;
    dictionary.name[currentID] = x[y].text;
    currentID++;
    if(currentID == nrof_pic){
      currentID = 0;
      $('select option[id='+dictionary.name[nrof_pic-1] +']').attr("selected",false);
      $('#image').attr('alt', currentID);
      $('#image').attr('src', path+currentID);
      $('select option[id='+dictionary.name[currentID] +']').attr("selected",true);
    }else{
      $('select option[id='+dictionary.name[currentID-1] +']').attr("selected",false);
      $('#image').attr('alt', currentID);
      $('#image').attr('src', path+currentID);
      $('select option[id='+dictionary.name[currentID] +']').attr("selected",true);
    }
  }
})

$('#save').click(function(){
  $.ajax({
    url: "/save",
    method: "POST",
    data: dictionary.name
  }).done(function(data){

  })
})
