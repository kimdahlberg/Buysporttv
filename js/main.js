var selectedColor = '#c0392b';
var inactiveColor = 'transparent';

sessionStorage.setItem('selectedSport', 'football');
sessionStorage.setItem('selectedLeague', 'premier league');
sessionStorage.setItem('selectedTeam', 'napoli');


// Add red bottom border to selected element
function toggleActive(callerElement) {
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
    r.fpassword = 'turtleTerminator98'
    r.cpassword = 'turtleTerminator98'
    r.femail = 'plumber4life@wahoo.com'
    r.cemail = 'plumber4life@wahoo.com'
    r.submitReg = 1;
    return r;
}

function createDummyProduct(id) {
    var product = {};
    product.id = id;
    product.type = 'Football'
    product.home = 'Napoli';
    product.away = 'Bologna';
    product.date = '2017-04-04';
    product.starttime = '18:30';
    product.stoptime = '20:00';
    product.price = 20;
    return product;
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
                console.log(response);
            }
        });
    });

    // GET all products of chosen league and team
    $('.league-toggle').click(function (e) { 
        e.preventDefault();

        // TODO: create object from league and team selection
        // Store last clicked league/team in variables?
        var d = {
            league: 'nhl',
            team: 'carolina hurricanes'
        };

        $.ajax({
            type: "POST",
            url: "http://localhost/buysporttv/api/products_ALL_match.php",
            data: d,
            dataType: 'json',
            success: function (response) {
                var returnedProducts = JSON.parse(response);
                console.log(response);
                createProductViewHtml(returnedProducts, sessionStorage.getItem('selectedLeague'));
            },
            error: function() {
                console.log("Request failed");
            }
        });
    });

    // Click carousel item, get productview
    // $('')

    // GET all premier league games
    $.ajax({
        type: "GET",
        url: "http://localhost/buysporttv/api/products_premier_league.php",
        // dataType: 'json',
        success: function (response) {
            var returnedProducts = JSON.parse(response);
            console.log(response);
            console.log(returnedProducts);
            createProductViewHtml(returnedProducts, 'Some Team');
        }
    });
});