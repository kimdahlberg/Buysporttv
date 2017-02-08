// var selectedColor = '#c0392b';
// var inactiveColor = 'transparent';

// function toggleActiveHidden(callerElement, targetElement) {
//     if ($(targetElement).hasClass('hidden')) {      
//             $(targetElement).removeClass('hidden');
//             $(callerElement).addClass('active');
//         } 
//         else {
//             $(this).css('border-bottom-color', inactiveColor);
//             $('#league-row').addClass('hidden');
//         }

//     if(!$(callerElement).hasClass('active')){
//         var activeTree = $(callerElement).siblings('.active');
//         activeTree.removeClass('active')
//         $(callerElement).siblings('.active').removeClass('active');
//     }
// }

// $(document).ready(function() {
//     // Toggle visibility of #league-row 
//     $('.sport-toggle').click(function() {
//         if ($('#league-row').hasClass('hidden')) {
            
//             $('#league-row').removeClass('hidden');
//             $(this).addClass('active');
//         } 
//         else {
//             $(this).css('border-bottom-color', inactiveColor);
//             $('#league-row').addClass('hidden');
//         }
//     });

//     // Toggle visibility of #upcoming-games
//     $('.league-toggle').click(function() {
//         if ($('#upcoming-games').hasClass('hidden')) {

//             $('#upcoming-games').removeClass('hidden');
//         }
//         else {

//             $('#upcoming-games').addClass('hidden');
//         }
//     })
// })

$('#regButton').click(function (e) { 
    e.preventDefault();

    // var r = {
    //     'fname': $('#inputFirstNameRegistration').val(),
    //     'lname': $('#inputLastNameRegistration').val(),
    //     'fpassword': $('#inputPasswordRegistration').val(),
    //     'cpassword': $('#inputPasswordRegistration').val(),
    //     'femail': $('#inputEmailRegistration').val(),
    //     'cemail': $('#inputEmailRegistration').val()
    // };

    var r = {};
    r.fname = $('#inputFirstNameRegistration').val();
    r.lname = $('#inputLastNameRegistration').val();
    r.fpassword = $('#inputPasswordRegistration').val();
    r.cpassword = $('#inputPasswordRegistration').val();
    r.femail = $('#inputEmailRegistration').val();
    r.cemail = $('#inputEmailRegistration').val();
    
    

    for (var key in r) {
        console.log(r);
    }
    
    $.ajax({
        type: "POST",
        url: "http://localhost/buysporttv/api/signup.php",
        data: JSON.stringify(r),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            for (var key in response) {
                console.log(key);
                console.log(response);
            }
        }
    });
});
