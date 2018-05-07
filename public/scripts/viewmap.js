



function banana() {
  // making a get request to an endpoint that triggers a query to db for marker info
  $.ajax(`/maps/data/${mapid}`)
    // result sent back from query is "data"
    .then( (data) => {
      // map location will always be set to Toronto for demo
      var mapLocation = {lat: -25.363, lng: 131.044};
      var map = new google.maps.Map(document.getElementById('map'), {
        center: mapLocation,
        zoom: 5
      });
      // this section dynamically creates a marker based on the amount of markers
      // within the response of the query request on line 4

      // a loop that declares markers and info windows based on amount of rows
      // in the result of the query
      let i = 0
      let markerLocations = [];
      var bounds = new google.maps.LatLngBounds();
      for (row of data) {
        var pinLatLng = {lat: Number(row.location_lat), lng: Number(row.location_long)};
        markerLocations.push(pinLatLng)
        // a closure function that creates markers and assigns an event listener to each
        function createMarker() {
          var marker =  new google.maps.Marker({
              map: map,
              position: pinLatLng,
              title: row.title
            })
          // declaring the info window
          var infowindow = new google.maps.InfoWindow({
            content: row.title,
            position: pinLatLng,
            })
            // event listener that displays info window on click
            marker.addListener("mouseover", function() {
              infowindow.open(map, marker)
            })
            marker.addListener("mouseout", function() {
              infowindow.close(map, marker)
            })
          return marker
        }

        createMarker()

          $('.map-title').text(row.m_title)
          $('.list-group')
            .append( $("<li>" ).html(row.title)
              .prepend( $("<img>")
                .attr('src', 'https://bit.ly/2IenEXM')
                .addClass("list-marker-item") )
              .addClass("list-group-item")
              .attr('id', `item${i}`) )

              let markerpos = markerLocations[i]
              $(`#item${i}`).on('click', () => {
                map.setZoom(7)
                map.panTo(markerpos);
              })
              bounds.extend(markerLocations[i]);
          i++;
      }

      map.fitBounds(bounds);



      $.ajax(`/maps/data`)
        .then( (data) => {
          for (row of data) {
            // console.log(row)

            var map = `<section class="map-tiles-index">
              <a href="/maps/${row.id}">
              <div class="well well-lg">
                <div class="img-cont">
                  <img src="/images/mapicon.png" class="img-rounded">
                </div>
                <a href=""><span id="username"><p></p></span></a>
                <div class="desc-cont">
                  <h3>${row.title}</h3>
                  <p>${row.description}</p>
                </div>
                <div class="interest">
                </div>
                <div class="footer">
                  <span id="icon"><i class="fas fa-heart" data-id="#">Like</i></span>
                </div>
              </div>
            </a>
            </section>`

            $('#feed').html(map)
          }

          var card = `<div class="card-body">
                  <h4 class="card-title">${row.title}</h4>
                  <p class="card-text">${row.description}</p>
                </div>
                <div class="card-footer bg-transparent border-success">@userid</div>
                `
        $("#cardbox").html(card)



        })
  })
}

$(document).ready(function(){
  let $map = $('<script>').attr('src', `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=banana`);
  $('.map-container').append($map);
});
