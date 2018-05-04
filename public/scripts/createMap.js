


function initMap() {
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

  function postMap(markerArr){
    var array = [];
    console.log('hi')
    markerArr.forEach(function(element){
    console.log(element.marker);
    console.log(element.marker.getPosition().lng());

    element.lat = element.marker.getPosition().lat();
    element.lng = element.marker.getPosition().lng();
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
    console.log(array)
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
      } else {

      }
      return data;
    }).then(data =>{
      console.log(data)
    });

  }

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
                            draggable:true,
                            title: '',
                            info: '',
                            description: '',
                            picture_url: ''

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
                                  }),

                            title: '',
                            info: '',
                            description: '',
                            picture_url: ''

                          });
      }

      console.log(markerArray[targetPin].marker.getPosition().lat())


    });



      $('#submit-pin').on('click', function(element){
        let title = $('#title-input').val();
        let info = $('#info-input').val();
        let description = $('#description-input').val();
        let pic = $('#pic-input').val();


        markerArray[targetPin].title = title;
        markerArray[targetPin].info = info;
        markerArray[targetPin].description = description;
        markerArray[targetPin].picture_url = pic;


        $('body').append($('<div>').text(`Pin number: ${targetPin}
                                           title: ${title}
                                           info: ${info}
                                           description: ${description}
                                           pic_url: ${pic}`));
        targetPin ++;
        console.log(markerArray)
      });


      // var tempMarker = markerArray[targetPin].marker


      // tempMarker.addListener('click', function(e) {
      //   var infowindow = new google.maps.InfoWindow({
      //     content: "hello!"
      //   });

      //   infowindow.open(map, tempMarker);

      // });
  };


  placeMarker();

  console.log('initializing click');
  $('#submit-map').on('click', function(element){
    console.log('hi')
    postMap(markerArray);
  })


}


$(document).ready(function(){
  let $map = $('<script>').attr('src', `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`);
  $('.container').append($map);
});
