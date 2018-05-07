
$.ajax(`/maps/data`)
  .then( (data) => {
    for (row of data) {
      // console.log(row)

      var map = `<section class="map-tiles-index">
        <a href="/maps">
        <div class="well well-lg">
          <div class="img-cont">
            <img src="/images/mapicon.png" class="img-rounded">
          </div>
          <a href="/users/:userid"><span id="username"><p></p></span></a>
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


  })
