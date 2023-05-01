$(document).ready(function() {
    $('#searchWord').val('');

    $('#searchWord').select2({
        multiple: true,
        maximumSelectionLength: 1,
    });
   
    $('#searchWord').on('select2:select', function(e) {
        // Submit the form
        $(this).closest('form').submit();
      });
    
      // Listen for keypress event
      $('#searchWord').on('keypress', function(e) {
        if (e.which == 13) { // Enter key pressed
          // Submit the form
          $(this).closest('form').submit();
        }
    });

    $.ajax({
        url: '/users',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var select = $('#searchWord');
            $.each(response.users, function(index, item) {
                var option = $('<option>', {
                    value: item.id,
                    text: item.fname + ' ' + item.lname
                });
                select.append(option);
                });

            select.trigger('change');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " " + errorThrown);
        }
    });



    // Show Participant When Click an event for today
    $("div.dash.card").click(function() {
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



