var selectedColor = '#c0392b';
var inactiveColor = 'transparent';

// Add red bottom border to selected element
function toggleActive(callerElement) {
    console.log("HEJ");
    if(!$(callerElement).hasClass('active')){
        $(callerElement).siblings('.active').removeClass('active');
    };
    $(callerElement).addClass('active');
}

// return test object
function createDummyRegistration() {
    var r = {};
    r.fname = 'Super'
    r.lname = 'Mario'
    r.fpassword = 'superPooP89'
    r.cpassword = 'superPooP89'
    r.femail = 'poop@gmail.com'
    r.cemail = 'poop@gmail.com'
    r.submitReg = 1;
    return r;
}

// TODO: html structure of productdetails
function createProductDetailHtml(data) {
    var productDetails = JSON.parse(data);
}

$(document).ready(function () {
    
    $('.sport-toggle').click(function (e) { 
        e.preventDefault();
        toggleActive(this);
    });

    $('.league-toggle').click(function (e) { 
        e.preventDefault();
        toggleActive(this);
    });


    // REQUESTS

    // Registration request
    $('#regButton').click(function (e) { 
        e.preventDefault();

        // create object from registration form
        var r = {};
        r.fname = $('#inputFirstNameRegistration').val();
        r.lname = $('#inputLastNameRegistration').val();
        r.fpassword = $('#inputPasswordRegistration').val();
        r.cpassword = $('#inputPasswordRegistration').val();
        r.femail = $('#inputEmailRegistration').val();
        r.cemail = $('#inputEmailRegistration').val();
        r.submitReg = 1;

        // Send request to php
        $.ajax({
            type: "POST",
            url: "http://localhost/buysporttv/api/signup.php",
            data: r,
            success: function (response) {
                for (var key in response) {
                    // TODO: registration success message to user
                    console.log(key);
                    console.log(response);
                }
            }
        });
    });
});


