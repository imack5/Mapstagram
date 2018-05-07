
function initMap() {

  $('#myCreatePageModal').modal('show');

  function deletePin(pin){

    let pinNumber = pin.parent().siblings(`.pin-number`).text() - 1;
    console.log(markerArray)
    markerArray.splice(pinNumber, 1);
    console.log(markerArray)
    targetPin--;
    appendMarkerSet();
    console.log(pinNumber);

  }

  function editPin(pin){
     let pinNumber = pin.parent().siblings(`.pin-number`).text() - 1;

     $("#title-input").val(markerArray[pinNumber].title);
     $("#info-input").val(markerArray[pinNumber].info);
     $("#description-input").val(markerArray[pinNumber].description);

     if($("#submit-pin").hasClass("show")){
      $("#submit-pin").toggleClass('hide show');
       $("#submit-pin-edit").toggleClass('hide show');
     }

     $("#submit-pin-edit").on('click', function(e){

       markerArray[pinNumber].title = $("#title-input").val();
       markerArray[pinNumber].info = $("#info-input").val();
       markerArray[pinNumber].description = $("#description-input").val();
       $("#submit-pin").toggleClass('hide show');
       $("#submit-pin-edit").toggleClass('hide show');

       appendMarkerSet();

     })

     console.log(pinNumber);
  }

  function appendMarker(marker){

    let $pin = $('<div>').addClass("pin-info-container d-flex justify-content-between list-group-item-action list-group-item")
    $pin.append($("<div>").addClass('pin-number').text(marker.id + 1));
    $pin.append($("<div>").addClass('title').text(`Location Title: ${marker.title}`));
    $pin.append($("<div>").addClass('info').text(`Info: ${marker.info}`));


    $deleteButton = $("<div>").attr("id", "delete-pin").addClass("btn btn-danger").attr("type", "button").text("Delete");
    $editButton = $("<div>").attr("id", "edit-pin").addClass("btn btn-warning").attr("type", "button").text("Edit");
    $buttons = $("<div>").addClass("button-holder")
      .append($deleteButton)
      .append($editButton);

    $pin.append($buttons);

    $(".pin-container").append($pin);
  }

  function appendMarkerSet(){
    //console.log(markerArray)
    $(".pin-container").empty();
    markerArray.forEach((element, index) => {
      element.id = index;
      console.log(element.id)
      appendMarker(element);
    })
  }

  let currentPlace;
  let targetPin = 0;
  let markerArray = [

                  ];

  let mapObject = {};

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

    newAutoPin.id = targetPin;

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
      let temp = {
        marker: markerArray.marker
      }

      console.log(markerArray)

      if(markerArray.length === targetPin){
        markerArray.push(temp);
      } else {
        markerArray[targetPin].marker.setMap(null);
        markerArray.pop();
        markerArray.push(temp);
      }
      console.log(markerArray)
    }

    $("#auto-place-name").text(`${place.name}`)
    console.log(place.name)
    $("#place-info").text(`A ${place.types[0]} with a rating of ${place.rating}`);
    $("#auto-place-address").text(`Title: ${place.formatted_address}`)

    //infowindowContent.children['place-name'].textContent = place.name;
    //infowindowContent.children['place-id'].textContent = place.place_id;
    //infowindowContent.children['place-address'].textContent = place.formatted_address;


    //infowindow.open(map, marker);
    currentPlace = place;
  });



  function postMap(markerArr){
    var array = [];
    array.push(mapObject);

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

        console.log('length', markerArray.length, "targer pin", targetPin)
        console.log(markerArray);
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

    if(markerArray[targetPin] !== undefined){
      console.log("we're gucci");
      $("#pin-warning").attr("style", "display: none")

      //custom pin
      if(customPin === true){

        let title = $('#title-input').val();
        let info = $('#info-input').val();
        let description = $('#description-input').val();
        let pic = $('#pic-input').val();


        markerArray[targetPin].title = title;
        markerArray[targetPin].info = info;
        markerArray[targetPin].description = description;
        markerArray[targetPin].picture_url = pic;

        //auto pin
      } else {

        let info = $('#custom-info-input').val();
        let description = $('#custom-description-input').val();
        let title = $('#auto-place-name').text();


        console.log("imptttt", markerArray);


        markerArray[targetPin].title = title;
        markerArray[targetPin].info = info;
        markerArray[targetPin].description = description;
        markerArray[targetPin].id = targetPin;
        //let pic = $('#pic-input').val();


        //console.log(currentPlace.geometry.location.lng(), currentPlace.geometry.location.lng());

      }
      console.log('submitted pin #', targetPin);

      appendMarkerSet();

      targetPin ++;
      console.log('current pin #', targetPin);



    } else {
     $("#pin-warning").attr("style", "display: block")
    }
  });


      // tempMarker.addListener('click', function(e) {
      //   var infowindow = new google.maps.InfoWindow({
      //     content: "hello!"
      //   });

      //   infowindow.open(map, tempMarker);

      // });



      $('.pin-container').on('click', '.pin-info-container', function(event){
        //event.stopPropagation();
        let pinNumber = $(this).children('.pin-number').text();

        let selectedPin = markerArray[pinNumber - 1].marker;

        //console.log(pinNumber, selectedPin);
        map.panTo(selectedPin.getPosition())
        map.setZoom(17);

      });

      $('#auto-button').on('click', function(element){


        if(customPin === true){
          $('#auto-button').toggleClass('faded notfaded');
          $('#custom-button').toggleClass('faded notfaded');
          $('#custom-pins').toggleClass('hide show');
          $('#auto-pins').toggleClass('hide show');
          $('#pac-input').toggleClass('hide show');

        }
        $("#pac-input").focus();
        customPin = false;
      })

      $('#custom-button').on('click', function(element){

        if(customPin === false){
          $('#custom-button').toggleClass('faded notfaded');
          $('#auto-button').toggleClass('faded notfaded');
          $('#custom-pins').toggleClass('hide show');
          $('#auto-pins').toggleClass('hide show');
          $('#pac-input').toggleClass('hide show');
        }
        customPin = true;
      })

  //Modal load to create map




  $(".pin-container").on('click', '#edit-pin', function(event){
    event.stopPropagation();
    console.log("edit")
    editPin($(this));

  })

  $("#create-map-confirm").on('click', function(element){
    mapObject = {
      title: $("#map-title-input").val(),
      description: $("#map-description-input").val()
   }
    $(".pins").prepend($("<h4>").addClass('sidebar-title').text(mapObject.title));
    console.log(mapObject);


  })

  $(".pin-container").on('click', '#delete-pin', function(event){
    event.stopPropagation();
    console.log("delete")
    deletePin($(this));

  })

  $('#submit-map-confirm').on('click', function(element){
    postMap(markerArray);
    console.log('hey')
  });
}

$(document).ready(function(){
  let $map = $('<script>').attr('src', `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`);
  $('.container').append($map);
});
