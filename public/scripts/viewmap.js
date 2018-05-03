function banana() {
  $.ajax('/maps/data')
    .then( (data) => {
      var myLatLng = {lat: -25.363, lng: 131.044};
      var myLatLng1 = {lat: Number(data[0].location_lat), lng: Number(data[0].location_long)};

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
        title: data[0].title
      })

    })
}

$(document).ready(function(){
  let $map = $('<script>').attr('src', `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=banana`);
  $('.container').append($map);
});
