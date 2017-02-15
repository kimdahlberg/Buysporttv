var selectedColor = '#c0392b';
var inactiveColor = 'transparent';
var cartTotal = 0;
const rootUrl = "/buysporttv";

$(document).ready(function () {
    // html setups for various pages
    numOfProducts = JSON.parse(sessionStorage.getItem('selectedProducts'));
    if (numOfProducts) {
        $('.glyphicon-shopping-cart').text(numOfProducts.length);
    }
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

    // Press button to store product locally for displaying in cart
    $('#upcoming-games').on('click', '.btn-buy', function (e) { 
        e.preventDefault();
        let selectedProduct = $(this).data('json');
        let productsInCart = null;
        // receive object array from sessionStorage
        try {
            productsInCart = JSON.parse(sessionStorage.getItem('selectedProducts'));
            if (isInArray(productsInCart, selectedProduct) === false) {
                $(this).val('Tillagd!');
                productsInCart.push(selectedProduct);
            }
            else {
                $(this).val('Redan tillagd!');
            }
        }
        catch(err) { // Parse failed, which means nothing's been stored so far
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
        let button = this;
        // Get product data stored as json in button
        let product = $(button).data('json');
        // Get list of products user put in cart
        let productsInCart = JSON.parse(sessionStorage.getItem('selectedProducts'));
        // Find index of product and remove it from sessionStorage
        let index = isInArray(productsInCart, product);
        if (index !== false) {
            productsInCart.splice(index, 1);
            sessionStorage.setItem('selectedProducts', JSON.stringify(productsInCart));
        }
        cartTotal -= product.price;    
        $('.cart-total strong').text(cartTotal + " :-");
        // Remove product
        let elementToRemove = $(button).parents('tr');
        $(elementToRemove).remove();
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
            url: rootUrl + "/api/matcher.php",
            data: id,
            dataType: "json",
            success: function (isRemoved) {
                if (isRemoved === true) {
                    let elementToRemove = $(button).parents('tr');
                    $(elementToRemove).remove();
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
            url: rootUrl + "/api/matcher.php",
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
            url: "/api/signup.php",
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
            url: rootUrl + "/api/login.php",
            data: d,
            dataType: "json",
            success: function (response) {
                // Store 1 in userPrivileges on successful login
                sessionStorage.setItem('userPrivileges', 1);
                $('.modal-footer button').trigger('click');
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

        $('#upcoming-games').html(createLoadingHtml());

        $.ajax({
            type: "POST",
            url: rootUrl + "/api/products_ALL_match.php",
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
            error: function(response) {
                console.log('Request failed');
                console.log(response.responseText);
            }
        });
    });
});