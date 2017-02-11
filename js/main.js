var selectedColor = '#c0392b';
var inactiveColor = 'transparent';

sessionStorage.setItem('selectedSport', 'football');
sessionStorage.setItem('selectedLeague', 'serie a');
sessionStorage.setItem('selectedTeam', 'napoli');


// Add red bottom border to selected element
function toggleActive(selectedElement) {
    if(!$(selectedElement).hasClass('active')){
        $(selectedElement).siblings('.active').removeClass('active');
    };
    $(selectedElement).addClass('active');
}

$(document).ready(function () {

    if (sessionStorage.getItem('selectedLeague')) {
        var dataLeague = sessionStorage.getItem('selectedLeague');
        var leagueButton = $('.league-toggle[data-league="' + dataLeague + '"]');
        toggleActive(leagueButton);
        createCarouselViewHtml(LEAGUE_TEAMS[dataLeague]);
    };

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