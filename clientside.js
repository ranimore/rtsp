
$(document).ready(function () {
   
    $('#Start_button').click(function () {
        var obj = {
            sp : $('#sptxt').val(),
            vl : $('#vltxt').val(),
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:1337/Start_recording',
             dataType: "json",
            data: JSON.stringify(obj),
           contentType: "application/json",
            
        });
    });

   }); 