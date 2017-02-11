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
function createCarouselIndicators(leagueName, numberOfIndicators) {
    var indicatorHtml =  '<ol class="carousel-indicators">';
    //  create an indicator for every 'page' in the carousel
    for (var indicator = 0; indicator < numberOfIndicators; indicator++) {
        indicatorHtml += '<li data-target="#carousel-'+leagueName+'" data-slide-to="'+indicator+'" class="active"></li>';
    }
    indicatorHtml += '</ol>';
    return indicatorHtml;
}

function createCarouselTeam(teamData) {
    var carouselItem = '<div class="col-md-2 col-sm-4 col-xs-6">'
    +   '<a href="#" class="thumbnail" role="button" data-team="'+teamData.name+'" data-toggle="collapse" data-target="#team-upcoming-games">'
    +   '<h2>AC Milan</h2>'
    +   '</a></div>';
}

function createCarouselViewHtml(teamList) {  
    var carouselView = '';
}

function createProductDetailHtml(productData) {
    var productDetailBox = '<div class="col-md-3 col-sm-6 col-xs-12 faded-border" role="button">' 
    +   '<div class="col-xs-12 collapsed" data-toggle="collapse" data-target="#game-details-'+productData.id+'">' 
    +       productData.home + ' - ' + productData.away 
    +   '</div>' 
    +   '<div class="col-xs-12 collapse" id="game-details-'+productData.id+'">' 
    +       '<hr>' 
    +       '<p>' + parseDate(productData.startdate) +'</p>' 
    +   '<p>' + parseTime(productData.startdate) + ' - ' + parseTime(productData.stopdate) + '</p>' 
    +   '<p>' + productData.price + ':-</p>' 
    +   '<button class="btn btn-special btn-block" type="button">Köp</button>' 
    +   '</div>' 
    +'</div>';
    return productDetailBox;
}

// Displays all the products returned from the database
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

