var selectedColor = '#c0392b';
var inactiveColor = 'transparent';

sessionStorage.setItem('selectedSport', 'football');
sessionStorage.setItem('selectedLeague', 'premier league');


// Add red bottom border to selected element
function toggleActive(selectedElement) {
    if(!$(selectedElement).hasClass('active')){
        $(selectedElement).siblings('.active').removeClass('active');
    };
    $(selectedElement).addClass('active');
}

$(document).ready(function () {

    // load teams of preselected league
    if (sessionStorage.getItem('selectedLeague')) {
        var dataLeague = sessionStorage.getItem('selectedLeague');
        var leagueButton = $('.league-toggle[data-league="' + dataLeague + '"]');
        toggleActive(leagueButton);
        // Create carouselview in div that leagueButton targets
        $(leagueButton.data('target'))
            .html(createCarouselViewHtml(LEAGUE_TEAMS[dataLeague]));
    }

    $('.sport-toggle').click(function (e) { 
        e.preventDefault();
        toggleActive(this);
        sessionStorage.setItem('selectedSport', $(this).data('sport'));
    });

    $('.league-toggle').click(function (e) { 
        e.preventDefault();
        toggleActive(this);
        let target = $(this).data('target');
        let league = $(this).data('league');
        sessionStorage.setItem('selectedLeague', league);
        $(target).html(createCarouselViewHtml(LEAGUE_TEAMS[league]));
    });

    $('.btn-buy').click(function (e) { 
        e.preventDefault();
        // TODO: get array of currently selected products
        var selectedProduct = $(this).data('productId');
        var productsInCart = sessionStorage.getItem('selectedProducts');
        if(productsInCart) {
            if (productsInCart.indexOf(selectedProduct)) {
                console.log('Product already in cart');
            }
            else {
                productsInCart.push(selectedProduct);
            }
        }
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

    $('#carousel-col').on('click', '.team-toggle', function(e) { 
        console.log('TOGGLE YOU BASTARD');
        e.preventDefault();
        // store selected team for future use
        let team = $(this).data('team');
        sessionStorage.setItem('selectedTeam', team);
        console.log('Toggling team! \nStored team: ' + sessionStorage.getItem('selectedTeam')
        +   '\nSelected team: ' + team);
        var d = {
            league: sessionStorage.getItem('selectedLeague'),
            team: team
        };

        $.ajax({
            type: "POST",
            url: "http://localhost/buysporttv/api/products_ALL_match.php",
            data: d,
            dataType: 'json',
            success: function (response) {
                console.log(response.length);
                if (response.length > 0) {
                    let sectionTitle = d.team;
                    $('#team-upcoming-games')
                    .html(createProductViewHtml(response, sectionTitle));
                }
                else {
                    $('#team-upcoming-games').html(createNoMatchesView('Inga matcher hittades'));
                }
            },
            error: function() {
                console.log('Request failed');
            }
        });
    });

    // GET all premier league games
    // $.ajax({
    //     type: "GET",
    //     url: "http://localhost/buysporttv/api/products_premier_league.php",
    //     // dataType: 'json',
    //     success: function (response) {
    //         var returnedProducts = JSON.parse(response);
    //         console.log(response);
    //         console.log(returnedProducts);
    //         createProductViewHtml(returnedProducts, 'Some Team');
    //     }
    // });
});