// Get the date from sql datetime object
function parseDate(dateObject) {
    return $.format.date(dateObject, "dd-MM-yyyy");
}
// Get the time from sql datetime object
function parseTime(dateObject) {
    return $.format.date(dateObject, "HH:mm");
}


/*
    Functions to create html from data received from database
*/

/**
 * Creates an indicator for every slide in the carousel
 */
function createCarouselIndicators(numberOfIndicators) {
    var indicatorHtml =  '<ol class="carousel-indicators">';
    for (var indicator = 0; indicator < numberOfIndicators; indicator++) {
        indicatorHtml += '<li data-target="#carousel-teams" data-slide-to="'+indicator+'"></li>';
    }
    indicatorHtml += '</ol>';
    return indicatorHtml;
}
/**
 * Creates a thumbnail of selected team
 */
function createCarouselTeam(teamData) {
    var carouselTeam = '<div class="col-md-2 col-sm-4 col-xs-6">'
    +   '<a href="#" class="thumbnail" role="button" data-team="'+teamData+'" data-toggle="collapse" data-target="#team-upcoming-games">'
    +   '<h2>AC Milan</h2>'
    +   '</a></div>';
    return carouselTeam;
}
/**
 * Creates a carousel filled with the teams of selected league
 */
function createCarouselViewHtml(teamList) {
    var numOfTeams = teamList.length; 
    var numOfIndicators = Math.ceil(numOfTeams / 6); 

    var carouselView = '<div id="carousel-teams" class="carousel slide">';
    carouselView += createCarouselIndicators(numOfIndicators);

    // Create an item/slide for every indicator
    carouselView += '<div class="carousel-inner">';  
    for (var item = 0; item < numOfIndicators; item++) {      
        carouselView += '<div class="item active">'
        +   '<div class="row text-center ">'; 

        // Create up to 6 team thumbnails on slide
        for (var index = 0 + (6*item) ; index < 6 + (6*item) || index < numOfTeams; index++) {
            carouselView += createCarouselTeam(teamList[index]);
        }
        carouselView += '</div></div>';
    }
    carouselView += '</div>'
    + '<a data-slide="prev" href="#carousel-teams" class="left carousel-control">‹</a>'
    + '<a data-slide="next" href="#carousel-teams" class="right carousel-control">›</a>'
    + '</div>';
    return carouselView;
}

/**
 * Creates a collapsible tab of match information
 */
function createProductDetailHtml(productData) {
    var productDetailBox = '<div class="col-md-3 col-sm-6 col-xs-12 faded-border" role="button">' 
    +   '<div class="col-xs-12 collapsed" data-toggle="collapse" data-target="#game-details-'+productData.id+'">' 
    +       productData.home + ' - ' + productData.away 
    +   '</div>' 
    +   '<div class="col-xs-12 collapse" id="game-details-'+productData.id+'">' 
    +       '<hr>' 
    +       '<p>' + parseDate(productData.startdate) +'</p>' 
    +       '<p>' + parseTime(productData.startdate) + ' - ' + parseTime(productData.stopdate) + '</p>' 
    +       '<p>' + productData.price + ':-</p>' 
    +       '<button class="btn btn-special btn-block" type="button">Köp</button>' 
    +   '</div>' 
    +'</div>';
    return productDetailBox;
}

/**
 * Displays all the products returned from the database
 */
function createProductViewHtml(productList, title) {
    var productViewBox = '<div class="row text-center">' +
        '<h1 class="col-md-12">' + title + '</h1>';
    for (var i = 0; i < productList.length; i++) {
        var pDetails = createProductDetailHtml(productList[i]);
        productViewBox += pDetails;
    }
    productViewBox += '</div>';
    $('#team-upcoming-games').html(productViewBox);
}

