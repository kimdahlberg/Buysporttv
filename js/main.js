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

    var registration = {
        'fname': $('#inputFirstNameRegistration').val(),
        'lname': $('#inputLastNameRegistration').val(),
        'password': $('#inputPasswordRegistration').val(),
        'email': $('#inputEmailRegistration').val()
    };
    
    

    for (var key in registration) {
        console.log(registration);
    }
    
    $.ajax({
        type: "POST",
        url: "http://localhost/buysporttv/api/signup.php",
        data: { 
            fname: 'Super',
            lname: 'Mario',
            femail: 'mushroom@wahoo.com',
            cemail: 'mushroom@wahoo.com',
            fpassword: 't0adSucks',
            cpassword: 't0adSucks'},
        success: function (response) {
            
        }
    });
});
