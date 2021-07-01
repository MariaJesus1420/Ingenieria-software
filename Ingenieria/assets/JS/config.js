



$(function () {
    console.log("READY");
    $('#weekly-schedule').dayScheduleSelector({
        /* options */

        // Sun - Sat
        days: [0, 1, 2, 3, 4, 5, 6],

        // HH:mm format
        startTime: '00:00',

        // HH:mm format       
        endTime: '24:00',

        // minutes                
        interval: 30,

        stringDays: ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab'],
    });
    console.log("HOLAAA");
});