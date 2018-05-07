$(document).ready(function() {
  $("#categories").hide();
  $(".btn-md").click(function() {
    $("#categories").slideToggle();
  });


  $("#search-input").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".map-tiles-index").filter(function() {
      console.log($(this).text())
      $(this).toggle($(this).find(".desc-cont").text().toLowerCase().indexOf(value) > -1)
    });
  });

  $(".cat-btn").click(function(event) {

    var category = event.target.id;
    console.log($(this));
    $(".map-tiles-index").filter(function() {
      $(this).toggle($(this).find(".interest").text().toLowerCase().indexOf(category) > -1)
    });
  });

});
