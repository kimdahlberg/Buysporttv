/**
 * Change display for a logged in experience
 */
function initializeLoggedInView() {
    // Insert log out button into navbar
    $('#login-logout').html(createNavLogoutHtml());
}

function initializeLoggedOutView() {
    $('#login-logout').html(createNavLoginHtml());
}

/**
 * Init code for matches page. Creates a carousel with team names.
 */
function initializeMatches() {
    let dataLeague = sessionStorage.getItem('selectedLeague');
    let leagueButton = $('.league-toggle[data-league="' + dataLeague + '"]');
    toggleActive(leagueButton);
    // Create carouselview in div that leagueButton targets
    $(leagueButton.data('target'))
        .html(createCarouselViewHtml(LEAGUE_TEAMS[dataLeague]));
}

/**
 * init code for checkout page
 */
function initializeCart() {
    // TODO: request products by their ids
    $.ajax({
        type: "GET",
        url: "http://localhost/buysporttv/api/products_premier_league.php",
        dataType: 'json',
        success: function (response) {
            $('#cart tbody').html(createCheckoutTableBodyHtml(response));
            for (let product of response) {
                cartTotal += parseInt(product.price);
            }
            console.log(cartTotal);
            $('.cart-total').html('<strong>Total: ' + cartTotal + ':-</strong>');
        }
    });
}