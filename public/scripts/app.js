


function banana() {
  var myLatLng = {lat: -25.363, lng: 131.044};
  var myLatLng1 = {lat: -25.35, lng: 131.044};

  // Create a map object and specify the DOM element
  // for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 2
  });

  // Create a marker and set its position.
  var marker = new google.maps.Marker({
    map: map,
    position: myLatLng,
    title: 'Hello World!'
  })

  var marker2 = new google.maps.Marker({
    map: map,
    position: myLatLng1,
    title: 'Hello World!'
  })

  map.addListener('click', function(e) {

    var data = {};
    data.lat = e.latLng.lat();
    data.lng = e.latLng.lng();
    var marker = new google.maps.Marker({
      position: data,
      map: map,
      animation: google.maps.Animation.DROP,
    });
  });


  marker.addListener('click', function(e) {
    var infowindow = new google.maps.InfoWindow({
      content: "hello!"
    });
    infowindow.open(map, marker);

  });

};


$(document).ready(function(){
  let $map = $('<script>').attr('src', `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=banana`);
  $('.container').append($map);
});
