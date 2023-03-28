document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'title,prev,next',
            center:'',
            right:''
        },
        defaultDate: new Date(),
        height: 500,
        aspectRatio: 3,
    });

    calendar.render();
});