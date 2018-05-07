$(document).ready(function(){
  console.log(userid)


  $.ajax(`/users/info/${userid}`)
    .then((data) => {
      var data = data[0]
      $("#user-name").text(`${data.first_name} ${data.last_name}`);
      $("#user-bio").text(data.bio);
      $("#user-pic").attr('src', data.prof_pic);
      $("#user-activities").text(`${data.first_name} ${data.last_name}'s Activities`)
      console.log('user', data)
    });


  $.ajax(`/users/posts/1`)
    .then((data) => {
      console.log( 'data', data)
      for (row of data) {


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

        $('.tab-content').append($("<div>").html(map))
      }
    })

  })
