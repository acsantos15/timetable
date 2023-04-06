$(document).ready(function() {
  $("div.dash.card").click(function() {
      var eventid = $(this).attr("id");
      $.ajax({
          url: "/events/"+eventid+"/users",
          type: 'GET',
          dataType: 'json',
          success: function(response) {
            $("#peopleModal").show();
              var num = 1;
              $.each(response, function(index, people) {
                $("#participant").append("<li style='list-style-type:none; margin-bottom:10px;'>"+num++ +".) "+people.fname+" "+people.lname+"</li>");
              });
          }
      });

  });

  $("div.dash2.card").click(function() {
    var eventid = $(this).attr("id");
    $.ajax({
        url: "/events/"+eventid+"/users",
        type: 'GET',
        dataType: 'json',
        success: function(response) {
          $("#peopleModal").show();
            var num = 1;
            $.each(response, function(index, people) {
              $("#participant").append("<li style='list-style-type:none; margin-bottom:10px;'>"+num++ +".) "+people.fname+" "+people.lname+"</li>");
            });
        }
    });
  });

  $(".btn-close").click(function(){
    $("#peopleModal").hide();
    $('#participant').empty();
  });
});