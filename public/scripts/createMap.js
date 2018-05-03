



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
      console.log(markerArray.length)
      console.log(markerArray)
      if(markerArray.length === targetPin){

        markerArray.push(
                        {
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
          markerArray.push({marker: new google.maps.Marker({
                                          position: data,
                                          map: map,
                                          animation: google.maps.Animation.DROP,
                                          title: 'Yeee Boiiii',
                                          draggable:true
                                        })
                            });
        }
        console.log(markerArray[targetPin].marker.getPosition().lat())
        $('.container').append($('<div>').text(`lat: ${markerArray[targetPin].marker.getPosition().lat()}  lon: ${markerArray[targetPin].marker.getPosition().lng()}`))
      });

      $('#submit-pin').on('click', function(element){
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

      console.log(markerArray);








  var marker =      {
                      id: 1,
                      marker: new google.maps.Marker({
                                map: map,
                                position: myLatLng,
                                title: 'Hello World!'
                              })
                    }

  markerArray.push(marker);




};
placeMarker();

}


$(document).ready(function(){
  let $map = $('<script>').attr('src', `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=banana`);
  $('.container').append($map);
});
