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
                    value: item.fname,
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


    
});



