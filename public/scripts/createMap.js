
function initMap() {
  let currentPlace;
  let targetPin = 0;
  let markerArray = [

                  ];

  let customPin = true;

  var myLatLng = {lat: 43.644868, lng: -79.395563};
  var myLatLng1 = {lat: -25.35, lng: 131.044};

  // Create a map object and specify the DOM element
  // for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 13
  });

  var input = document.getElementById('pac-input');
  console.log(input, $('#pac-input'))

  //Add search box
  var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  $('#pac-input').addClass("hide");

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);


let newAutoPin = {
                id: targetPin,

                marker: new google.maps.Marker({
                              map: map,
                              animation: google.maps.Animation.DROP,
                              draggable:false
                        }),

                title: '',
                info: '',
                description: '',
                picture_url: ''
            };




  // marker.addListener('click', function() {
  //   infowindow.open(map, marker);
  // });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    newAutoPin.marker = new google.maps.Marker({
                              map: map,
                              animation: google.maps.Animation.DROP,
                              draggable:false
                        });

    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    // Set the position of the marker using the place ID and location.
    newAutoPin.marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location
    });
    newAutoPin.marker.setVisible(true);

    if(customPin === false){
      if(markerArray.length === targetPin){
        markerArray.push(newAutoPin);
      } else {
        markerArray[targetPin].marker.setMap(null);
        markerArray.pop();
        markerArray.push(newAutoPin);
      }
    }

    $("#auto-place-name").text(`${place.name}`)
    console.log(place.name)
    $("#place-info").text(`A ${place.types[0]} with a rating of ${place.rating}`);
    $("#auto-place-address").text(`Title: ${place.formatted_address}`)

    infowindowContent.children['place-name'].textContent = place.name;
    //infowindowContent.children['place-id'].textContent = place.place_id;
    infowindowContent.children['place-address'].textContent = place.formatted_address;


    infowindow.open(map, marker);
    currentPlace = place;
  });



  function postMap(markerArr){
    var array = [];

    markerArr.forEach(function(element){

      if(element.marker){
        element.lat = element.marker.getPosition().lat();
        element.lng = element.marker.getPosition().lng();
      }

      array.push({

        title: element.title,
        info: element.info,
        description: element.description,
        location_lat: element.lat,
        location_long: element.lng,
        image: element.picture_url,
        map_id: 1

      })
    });

    $.ajax({
      type: 'post',
      url: '/maps',
      dataType: 'application/json',
      contentType: 'application/json',
      data: JSON.stringify(array)
    })
    .then((data, status, jqXHR) => {
      if (status !== "success") {
        console.error("There was an error getting to the site");
        throw "Request was not a success";
      }
    })
  }

  function placeMarker() {

    map.addListener('click', function(e) {

      var data = {};
      data.lat = e.latLng.lat();
      data.lng = e.latLng.lng();
      if(customPin === true){
        let newPin = {
                      id: targetPin,

                      marker: new google.maps.Marker({
                                    position: data,
                                    map: map,
                                    animation: google.maps.Animation.DROP,
                                    title: 'Yeee Boiiii',
                                    draggable:true
                              }),

                      title: '',
                      info: '',
                      description: '',
                      picture_url: ''
                  };


        if(markerArray.length === targetPin){
          markerArray.push(newPin);
        } else {
          markerArray[targetPin].marker.setMap(null);
          markerArray.pop();
          markerArray.push(newPin);
        }
      }

    });
  };


  placeMarker();


  $('#submit-pin').on('click', function(element){

        if(customPin === true){

          let title = $('#title-input').val();
          let info = $('#info-input').val();
          let description = $('#description-input').val();
          let pic = $('#pic-input').val();


          markerArray[targetPin].title = title;
          markerArray[targetPin].info = info;
          markerArray[targetPin].description = description;
          markerArray[targetPin].picture_url = pic;


        } else {

          markerArray.push({
            title: currentPlace.name,
            info: $('#custom-info-input').val(),
            description: $("#custom-description-input").val(),
            location_lat: currentPlace.geometry.location.lat(),
            location_long: currentPlace.geometry.location.lng(),
            image: '',
            map_id: 1
          });

          console.log(currentPlace.geometry.location.lng(), currentPlace.geometry.location.lng());

        }

        targetPin ++;
      });


      // tempMarker.addListener('click', function(e) {
      //   var infowindow = new google.maps.InfoWindow({
      //     content: "hello!"
      //   });

      //   infowindow.open(map, tempMarker);

      // });


      $('#toggle-pin-input').on('click', function(element){
        customPin = !customPin;
        $('#custom-pins').toggleClass('hide show');
        $('#auto-pins').toggleClass('hide show');
        $('#pac-input').toggleClass('hide show');
      })

  $('#submit-map').on('click', function(element){
    postMap(markerArray);
  });
}

$(document).ready(function(){
  let $map = $('<script>').attr('src', `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`);
  $('.container').append($map);
});
