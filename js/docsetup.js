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
 * Init code for matches page. creates league names, and a carousel with team names.
 */
function initializeMatches() {
    let dataLeague = sessionStorage.getItem('selectedLeague');
    if (dataLeague !== null &&  dataLeague !== undefined) {
        var selectedSport = getLeaguesSport(dataLeague);
        $('#league-row').html(createLeagueSelectorHtml(selectedSport));
    }
    let leagueButton = $('.league-toggle[data-league="' + dataLeague + '"]');
    toggleActive(leagueButton);
    // Create carouselview in div that leagueButton targets
    $(leagueButton.data('target')).html(createCarouselViewHtml(LEAGUE_TEAMS[dataLeague]));
}

/**
 * init code for checkout page
 */
function initializeCart() {
    let productList = JSON.parse(sessionStorage.getItem('selectedProducts'));
    $('#cart tbody').html(createCheckoutTableBodyHtml(productList));
    for (let product of productList) {
        cartTotal += parseInt(product.price);
    }
    $('.cart-total').html('<strong>Total: ' + cartTotal + ':-</strong>');
}

function initializeAdmin() {
    $.ajax({
        type: "POST",
        url: rootUrl + "/api/products_premier_league.php",
        dataType: "json",
        success: function (response) {
            if (response.length > 0) {
                $('tbody').html(createAdminTableBodyHtml(response));
            }
        },
        error: function (response) {
            console.log(response.reponseText);
        }
    });
}