/**
 *  Get the date from sql datetime
 */
function parseDate(sqlDateTime) {
    return $.format.date(sqlDateTime, "dd-MM-yyyy");
}
/**
 * Get the time from sql datetime
 */
function parseTime(sqlDateTime) {
    return $.format.date(sqlDateTime, "HH:mm");
}

/**
 * Check if object is in array.
 * Return index, or false if not found
 */
function isInArray(array, object) {
    for (let i = 0; i < array.length; i++) {
        if (object.id === array[i].id) {
            return i;
            console.log(array[i].id);
            console.log(object.id);
        }
    }
    return false;
}

/**
 * Takes string leagueName and returns which sport
 * league belongs to. Returns null if no match found.
 */
function getLeaguesSport(leagueName) {
    for (sport in SPORT_LEAGUES) {
        for (league of SPORT_LEAGUES[sport]) {
            if (league === leagueName) {
                return sport;
            }
        }
    }
    return null;
}

// DOM MANIPULATION

/**
 * Add red bottom border to element
 */
function toggleActive(selectedElement) {
    if(!$(selectedElement).hasClass('active')){
        $(selectedElement).siblings('.active').removeClass('active');
    };
    $(selectedElement).addClass('active');
}


// HTML STRING FUNCTIONS

function updateCartCount() {
// TODO: make adding number to cart glyph a function
    // sessionStorage.getItem('selectedProducts')
    // JSOn parse
    // check length
}
/**
 * Returns a html string of a loading gif
 */
function createLoadingHtml() {
    let html = '<img src="/img/Loading_icon.gif"/>';
    return html;
}
/**
 * create login button in the navbar, replacing the logout button
 */
function createNavLoginHtml() {
    return '<a href="#" data-toggle="modal" data-target="#loginModal" >Logga in</a>';
}
/**
 * Create logout button in the navbar, replacing the login button
 */
function createNavLogoutHtml() {
    return '<a href="#" class="btn-logout" role="button">Logga ut</a>';
}

/**
 * Simple text view to display if query returns an empty set
 */
function createNoMatchesView(message) {
    return '<h3 class="faded-border">' + message + '</h3>';
}

/**
 * Returns a html string of clickable league elements
 */
function createLeagueSelectorHtml(sport) {
    let html = '';
    // Iterate over every league name of selected sport
    for (league of SPORT_LEAGUES[sport]) {
        html +=
            '<div class="col-md-3 col-sm-3 col-xs-3 league-toggle matcher-view" role="button" data-league="' + league + '" data-target="#carousel-col">'
        +       '<h2>' + league.toUpperCase() + '</h2>'
        +   '</div>';
    }
    return html;
}

/**
 * Creates an indicator for every slide in the carousel
 */
function createCarouselIndicators(numberOfIndicators) {
    var indicatorHtml =  '<ol class="carousel-indicators">';
    indicatorHtml += '<li data-target="#carousel-teams" class="active" data-slide-to="'+0+'"></li>';
    for (var indicator = 1; indicator < numberOfIndicators; indicator++) {
        indicatorHtml += '<li data-target="#carousel-teams" data-slide-to="'+indicator+'"></li>';
    }
    indicatorHtml += '</ol>';
    return indicatorHtml;
}

/**
 * Creates a thumbnail of selected team
 */
function createCarouselTeam(teamData) {
    //TODO: when talking with the database, teamData will be an object instead of a string, use accordingly
    var carouselTeam = '<div class="col-md-2 col-sm-4 col-xs-6">'
    +   '<a href="#" class="thumbnail team-toggle" role="button" data-team="'+teamData+'" data-target="#team-upcoming-games">'
    +   '<h3>' +teamData+ '</h3>'
    +   '</a></div>';
    return carouselTeam;
}

/**
 * Creates a carousel filled with the teams of selected league
 */
function createCarouselViewHtml(teamList) {
    let numOfTeams = teamList.length; 
    let numOfIndicators = Math.ceil(numOfTeams / 6); 
    let count = 0;
    let count6 = 0;
    let carouselView = '<div id="carousel-teams" class="carousel slide">';
    carouselView += createCarouselIndicators(numOfIndicators);

    // create the items (slides) with 6 teams max per page
    carouselView += '<div class="carousel-inner">'; 
    for (var team of teamList) {
        
        // If the absolute first item, set it as active
        if (count === 0 && count6 === 0) {
            carouselView += '<div class="item active" data-indicator="'+count6+'">'
            +   '<div class="row text-center ">'; 
        }
        // Check whether to add a new item or not
        else if (count === 0) {
            carouselView += '<div class="item" data-indicator="'+count6+'">'
            +   '<div class="row text-center ">'; 
        }
        // Add team thumbnail to current item
        carouselView += createCarouselTeam(team);
        count++;
        // If 6 thumbnails in item div, close it. 
        // increment count6 to keep track of items created
        if (count === 6) {
            carouselView += '</div></div>';
            count = 0;
            count6++;
        };
    };
    // Exiting loop, if count
    if (count > 0) {
        carouselView += '</div></div>';
    }

    carouselView += '</div>'
    +   '<a data-slide="prev" href="#carousel-teams" class="left carousel-control">‹</a>'
    +   '<a data-slide="next" href="#carousel-teams" class="right carousel-control">›</a>'
    +   '</div>';
    return carouselView;
}

/**
 * Creates a collapsible tab of match information, 
 * also storing the product data as JSON in the button.
 */
function createProductDetailHtml(product) {
    var productDetailBox = '<div class="col-md-3 col-sm-6 col-xs-12 faded-border" role="button">' 
    +   '<div class="col-xs-12 collapsed" data-toggle="collapse" data-target="#game-details-'+product.id+'">' 
    +       product.home + ' - ' + product.away 
    +   '</div>' 
    +   '<div class="col-xs-12 collapse" id="game-details-'+product.id+'">' 
    +       '<hr>' 
    +       '<p>' + parseDate(product.startdate) +'</p>' 
    +       '<p>' + parseTime(product.startdate) + ' - ' + parseTime(product.stopdate) + '</p>' 
    +       '<p>' + product.price + ':-</p>' 
    +       '<button class="btn btn-buy btn-block" type="button" data-json=\''+ JSON.stringify(product) +'\'>Köp</button>' 
    +   '</div>' 
    +'</div>';
    return productDetailBox;
}

/**
 * Displays all the products returned from the database
 */
function createProductViewHtml(productList, title) {
    let productViewRow = 
    '<div class="row text-center">' 
    +   '<h1 class="col-md-12">' + title + '</h1>';
    for (let i = 0; i < productList.length; i++) {
        let pDetails = createProductDetailHtml(productList[i]);
        productViewRow += pDetails;
    }
    productViewRow += '</div>';
    return productViewRow;
}

/**
 * Creates table data for one product
 */
function createCheckoutProductHtml(product) {
    let html = 
        '<tr>'
    +       '<td data-th="Product">'
    +           '<div class="row">'
    +               '<div class="col-sm-2 hidden-xs">'
    +                   '<img src="http://placehold.it/100x100" alt="..." class="img-responsive"/>'
    +               '</div>'
    +               '<div class="col-sm-10">'
    +                   '<h4 class="nomargin">' + product.home + ' - ' + product.away + '</h4>'
    +                   '<p>'   + parseDate(product.startdate) + '   ' 
                                + parseTime(product.startdate) + ' - ' 
                                + parseTime(product.stopdate) 
    +                   '</p>'
    +               '</div>'
    +           '</div>'
    +       '</td>'
    +       '<td data-th="Price">' + product.price + ' :-' + '</td>'
    +       '<td class="actions text-right" data-th="">'
    +           '<button class="btn btn-danger btn-sm deleteCustomerProduct" data-json=\'' + JSON.stringify(product) + '\'><i class="glyphicon glyphicon-trash"></i></button>'
    +       '</td>'
    +   '</tr>';
    return html;
}
/**
 * Create the table body of the checkout table
 */
function createCheckoutTableBodyHtml(productList) {
    let html = '';
    for (let product of productList) {
        html += createCheckoutProductHtml(product);
    }
    return html;
}

/**
 * Create a product row
 */
function createAdminProductHtml(product) {
    let html =
        '<tr>'
    +       '<td>' + product.id + '</td>'
    +       '<td>' + product.home + '</td>'
    +       '<td>' + product.away +'</td>'
    +       '<td>' + product.startdate + '</td>'
    +       '<td>' + product.stopdate + '</td>'
    +       '<td>' + product.price +'</td>'
    +       '<td class="btn-toolbar" data-product=\'' + JSON.stringify(product) + '\'>'
    +           '<button type="" class="btn btn-danger glyphicon glyphicon-trash"></button>'
    +           '<button type="" data-toggle="modal" data-target="#updateModal" class="btn btn-warning glyphicon glyphicon-pencil"></button>'
    +       '</td>'
    +   '</tr>';
    return html;
}

/**
 * Create a table of products
 */
function createAdminTableBodyHtml(productList) {
    let html = '';
    for (let product of productList) {
        html += createAdminProductHtml(product);
    }
    return html;
}
