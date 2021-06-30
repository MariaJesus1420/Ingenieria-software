console.log('PENE');




$(function () {
    console.log("READY");
    $('#schedule').jqs({
        daysList: [
            'Lunes',
            'Martes',
            'Miercoles',
            'Jueves',
            'Viernes',
            'Sabado',
            'Domingo'
          ],
  
        periodColors: [

            ['rgba(200, 0, 0, 0.5)', '#f00', '#000'],
            ['rgba(0, 200, 0, 0.5)', '#0f0', '#000'],

        ],
        periodTitle: 'No title',
        periodBackgroundColor: 'rgba(200, 0, 0, 0.5)',
        periodBorderColor: '#f00',
        periodTextColor: '#00',
        periodRemoveButton: 'Eliminar',
        periodDuplicateButton: 'Duplicar',
        periodTitlePlaceholder: 'Titulo personalizado'
    });
    console.log("HOLAAA");
});