
$(document).ready(function() {

  // Show Participant When Click an event for today
  $("div.dash.card").hover(function() {
    var card = $(this);
    var eventid = $(this).attr("id");
    $.ajax({
      url: "/events/"+eventid+"/users",
      method: 'GET',
      success: function(data) {
        var num = 1;
        var userNames = ""; // create an empty variable to store user names
        $.each(data, function(index, people) {
          userNames += num++ +".) "+people.fname+" "+people.lname + "<br>"; // concatenate names
        });
        card.attr('data-bs-toggle', 'tooltip')
            .attr('data-bs-html', 'true')
            .attr('data-bs-original-title', "Participant/s<br>"+userNames)
            .tooltip('show');
      }
    });
  });

  // Show Participant When Click an event for tommorow 
  $("div.dash2.card").hover(function() {
    var card = $(this);
    var eventid = $(this).attr("id");
    $.ajax({
      url: "/events/"+eventid+"/users",
      method: 'GET',
      success: function(data) {
        var num = 1;
        var userNames = ""; // create an empty variable to store user names
        $.each(data, function(index, people) {
          userNames += num++ +".) "+people.fname+" "+people.lname + "<br>"; // concatenate names
        });
        card.attr('data-bs-toggle', 'tooltip')
            .attr('data-bs-html', 'true')
            .attr('data-bs-original-title', "Participant/s<br>"+userNames)
            .tooltip('show');
      }
    });
  });
});