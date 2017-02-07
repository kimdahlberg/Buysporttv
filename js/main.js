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