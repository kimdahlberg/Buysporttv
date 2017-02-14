var selectedColor = '#c0392b';
var inactiveColor = 'transparent';

$(document).ready(function () {
    // html setups for various pages
    if (sessionStorage.getItem('userPrivileges') !== 'undefined') {
        // change functionality according to login status
        initializeLoggedInView();
    }
    if (document.title === 'matchinfo' && sessionStorage.getItem('selectedLeague')) {
        initializeMatches();
    }
    else if (document.title === 'kundvagn') {
        initializeCart();
    }


    // BUTTON EVENTS 

    // Log out user
    $(document).on('click', '.btn-logout', function(e){
        sessionStorage.removeItem('userPrivileges');
        initializeLoggedOutView();
    });

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

    // press button to store product locally for displaying in cart
    $('#upcoming-games').on('click', '.btn-buy', function (e) { 
        e.preventDefault();
        let selectedProduct = JSON.parse($(this).data('product-id'));
        let productsInCart = null;
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

    // Delete product from checkout
    $('tbody').on('click', '.deleteCustomerProduct', function(e) {
        e.preventDefault();

    })

    // REQUESTS

    // Delete product from database
    $('tbody').on('click', '.deleteProduct', function(e) {
        e.preventDefault();
        // console.log(this);
        let button = this;
        let id = $(this).parent().data('id');
        $.ajax({
            type: "POST",
            url: "http://localhost/buysporttv/api/matcher.php",
            data: id,
            dataType: "json",
            success: function (isRemoved) {
                if (isRemoved === true) {
                    let elementToRemove = $(button).parents('tr');
                    $($(button).parents('tr')).remove();
                }
            },
            error: function (response) {
                console.log(response.responseText);
            }
        });
    });

    // Request to get upcoming games of selected league
    $('.league-toggle.index-view').click(function (e) {
        e.preventDefault();
        toggleActive(this);
        let target = $(this).data('target');
        let league = $(this).data('league');
        sessionStorage.setItem('selectedLeague', league);

        $.ajax({
            type: "POST",
            url: "http://localhost/buysporttv/api/matcher.php",
            data: league,
            dataType: "json",
            success: function (response) {
                $(target).html(createProductViewHtml(response, league));
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
            dataType: "json",
            success: function (response) {
                console.log(response);
                // check response for a successful registration
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
        d.submitLogin = true;
        
        $.ajax({
            type: "POST",
            url: "http://localhost/buysporttv/api/login.php",
            data: d,
            dataType: "json",
            success: function (response) {
                // Store 1 in userPrivileges on successful login
                sessionStorage.setItem('userPrivileges', 1);
                initializeLoggedInView();
            },
            error: function(response) {
                console.log('Error: ');
                console.log(response);
                alert(response.responseText);
            }
        });
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
});