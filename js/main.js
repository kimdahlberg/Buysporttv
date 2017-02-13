var selectedColor = '#c0392b';
var inactiveColor = 'transparent';

// sessionStorage.setItem('selectedSport', 'football');
// sessionStorage.setItem('selectedLeague', 'premier league');

// Add red bottom border to selected element
function toggleActive(selectedElement) {
    if(!$(selectedElement).hasClass('active')){
        $(selectedElement).siblings('.active').removeClass('active');
    };
    $(selectedElement).addClass('active');
}

$(document).ready(function () {
    if (sessionStorage.getItem('userPrivileges')) {
        
    }
    // html setups for various pages
    if (document.title === 'matchinfo' && sessionStorage.getItem('selectedLeague')) {
        let dataLeague = sessionStorage.getItem('selectedLeague');
        let leagueButton = $('.league-toggle[data-league="' + dataLeague + '"]');
        toggleActive(leagueButton);
        // Create carouselview in div that leagueButton targets
        $(leagueButton.data('target'))
            .html(createCarouselViewHtml(LEAGUE_TEAMS[dataLeague]));
    }
    else if (document.title === 'kundvagn') {
        // TODO: request products by their ids
        initializeCart();
        
    }

    // BUTTON EVENTS 

    $('.sport-toggle').click(function (e) { 
        e.preventDefault();
        toggleActive(this);
        sessionStorage.setItem('selectedSport', $(this).data('sport'));
    });

    // TODO: make html use data requested from database
    $('.league-toggle.matcher-view').click(function (e) { 
        e.preventDefault();
        toggleActive(this);
        let target = $(this).data('target');
        let league = $(this).data('league');
        sessionStorage.setItem('selectedLeague', league);
        $(target).html(createCarouselViewHtml(LEAGUE_TEAMS[league]));
    });

    $('#upcoming-games').on('click', '.btn-buy', function (e) { 
        e.preventDefault();
        let selectedProduct = $(this).data('product-id');
        var productsInCart = null;
        try {
            productsInCart = JSON.parse(sessionStorage.getItem('selectedProducts'));
            if (!isInArray(productsInCart, selectedProduct)) {
                $(this).val('Tillagd!');
                productsInCart.push(selectedProduct);
            }
            else {
                $(this).val('Redan tillagd!');
            }
        }
        catch(err) {
            console.log('No items stored yet. Creating cart');
            productsInCart = [selectedProduct];
            $(this).val('Tillagd!');
        }
        finally {
            sessionStorage.setItem('selectedProducts', JSON.stringify(productsInCart));
        }
    });

    // REQUESTS

    // Request to get upcoming games of selected league
    $('.league-toggle.index-view').click(function (e) { 
        console.log("BLAMMO");
        e.preventDefault();
        toggleActive(this);
        let target = $(this).data('target');
        let league = $(this).data('league');
        sessionStorage.setItem('selectedLeague', league);

        $.ajax({
            type: "GET",
            url: "http://localhost/buysporttv/api/products_premier_league.php",
            dataType: "json",
            success: function (response) {
                createProductViewHtml(response, sessionStorage.getItem('selectedSport'));
            },
            error: function() {
                console.log('Request for upcoming games failed.');
            }
        });
    });

    // Registration request
    $('#regButton').click(function (e) { 
        e.preventDefault();
        // create object from registration form
        let d = {};
        d.fname = $('#inputFirstNameRegistration').val();
        d.lname = $('#inputLastNameRegistration').val();
        d.fpassword = $('#inputPasswordRegistration').val();
        d.cpassword = $('#inputConfirmPasswordRegistration').val();
        d.femail = $('#inputEmailRegistration').val();
        d.cemail = $('#inputConfirmEmailRegistration').val();
        d.username = $('#inputUsernameRegistration').val();
        d.submitReg = 1;

        // Send request to php
        $.ajax({
            type: "POST",
            url: "http://localhost/buysporttv/api/signup.php",
            data: d,
            success: function (response) {
                console.log(response);
                if (response === 1) {
                    alert('Du är nu registrerad. Tack för ditt köp!');
                }
                else {
                    alert('Registreringen misslyckades');
                }
            }
        });
    });

    // Login request 
    $(document).on('click', '.btn-login', function(e) {
        e.preventDefault();
        let d = {};
        d.username = $('#inputUsernameModal').val();
        d.password = $('#inputPasswordModal').val();
        console.log(d);
        $.ajax({
            type: "POST",
            url: "http://localhost/buysporttv/api/login.php",
            data: d,
            dataType: "json",
            success: function (response) {
                // Store 1 in userPrivileges on successful login
            },
            error: function(response) {
                console.log('Error: ');
                console.log(response);
            }
        });
    });

    // log out user by setting sessionStorage to 
    $(document).on('click', '.btn-login', function(e){
        sessionStorage.removeItem('userPrivileges');
    });

    // Request to get all products of selected league and team
    $('#carousel-col').on('click', '.team-toggle', function(e) { 
        e.preventDefault();
        // store selected team for future use
        let team = $(this).data('team');
        sessionStorage.setItem('selectedTeam', team);

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
                if (response.length > 0) {
                    let sectionTitle = d.team;
                    $('#upcoming-games')
                    .html(createProductViewHtml(response, sectionTitle));
                }
                else {
                    $('#upcoming-games').html(createNoMatchesView('Inga matcher hittades'));
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