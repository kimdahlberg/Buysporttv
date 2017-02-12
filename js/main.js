var selectedColor = '#c0392b';
var inactiveColor = 'transparent';

sessionStorage.setItem('selectedSport', 'football');
sessionStorage.setItem('selectedLeague', 'serie a');
sessionStorage.setItem('selectedTeam', 'Villarreal');


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
        // // Set active item from team value in sessionStorage
        // var itemToActivate = $('.thumbnail[data-team="'+sessionStorage.getItem('selectedTeam')+'"]')
        // .parents('.item');
        // $('#carousel-teams').carousel(itemToActivate.data('indicator'));
    }

    $('.sport-toggle').click(function (e) { 
        e.preventDefault();
        toggleActive(this);
        sessionStorage.setItem('selectedSport', $(this).data('sport'));
    });

    $('.league-toggle').click(function (e) { 
        e.preventDefault();
        toggleActive(this);
        sessionStorage.setItem('selectedLeague', $(this).data('league'));
        $($(this).data('target'))
            .html(createCarouselViewHtml(LEAGUE_TEAMS[$(this).data('league')]));
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

    // GET all products of chosen league and team
    $('.team-toggle').click(function (e) { 
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
                    $('#team-upcoming-games')
                    .html(createProductViewHtml(response, response[0].league));
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