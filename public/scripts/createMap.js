



function banana() {
  let targetPin = 0;
  let markerArray = [

                  ];

  var myLatLng = {lat: -25.363, lng: 131.044};
  var myLatLng1 = {lat: -25.35, lng: 131.044};

  // Create a map object and specify the DOM element
  // for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 5
  });

  function placeMarker() {

    map.addListener('click', function(e) {

      var data = {};
      data.lat = e.latLng.lat();
      data.lng = e.latLng.lng();

      if(markerArray.length === targetPin){

        markerArray.push(
                        {
                            id: targetPin,

                            marker: new google.maps.Marker({
                            position: data,
                            map: map,
                            animation: google.maps.Animation.DROP,
                            title: 'Yeee Boiiii',
                            draggable:true

                          })
                        });
      } else {
        markerArray[targetPin].marker.setMap(null);
        markerArray.pop();
        markerArray.push({
                              id: targetPin,

                          marker: new google.maps.Marker({
                                  position: data,
                                  map: map,
                                  animation: google.maps.Animation.DROP,
                                  title: 'Yeee Boiiii',
                                  draggable:true
                                })
                          });
      }

      console.log(markerArray[targetPin].marker.getPosition().lat())


    });

      $('#submit-pin').on('click', function(element){
        $('.pins').append($('<div>').text(`Pin number: ${markerArray[targetPin].id} lat: ${markerArray[targetPin].marker.getPosition().lat()}  lon: ${markerArray[targetPin].marker.getPosition().lng()}`))
        targetPin ++;
        console.log(markerArray)
      });


      var tempMarker = markerArray[targetPin].marker


      tempMarker.addListener('click', function(e) {
        var infowindow = new google.maps.InfoWindow({
          content: "hello!"
        });

        infowindow.open(map, tempMarker);

      });
  };
placeMarker();

}


$(document).ready(function(){
  let $map = $('<script>').attr('src', `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=banana`);
  $('.container').append($map);
});
