function postMap(markerArr){
    var array = [];

    markerArr.forEach(function(element){

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
    });
  }



module.exports = postMap;
