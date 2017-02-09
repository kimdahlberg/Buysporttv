var selectedColor = '#c0392b';
var inactiveColor = 'transparent';

// Add red bottom border to selected element
function toggleActive(callerElement) {
    console.log("HEJ");
    if(!$(callerElement).hasClass('active')){
        $(callerElement).siblings('.active').removeClass('active');
    };
    $(callerElement).addClass('active');
}

// return test object
function createDummyRegistration() {
    var r = {};
    r.fname = 'Super'
    r.lname = 'Mario'
    r.fpassword = 'turtleTerminator98'
    r.cpassword = 'turtleTerminator98'
    r.femail = 'plumber4life@wahoo.com'
    r.cemail = 'plumber4life@wahoo.com'
    r.submitReg = 1;
    return r;
}

function createDummyProduct(id) {
    var product = {};
    product.id = id;
    product.type = 'Football'
    product.home = 'Napoli';
    product.away = 'Bologna';
    product.date = '2017-04-04';
    product.starttime = '18:30';
    product.stoptime = '20:00';
    product.price = 20;
    return product;
}

// TODO: html structure of productdetails
function createProductDetailHtml(productData) {
    var productDetailBox = '<div class="col-md-3 col-sm-6 col-xs-12 faded-border" role="button">' +
    '<div class="col-xs-12 collapsed" data-toggle="collapse" data-target="#game-details'+productData.id+'">' +
        productData.home + ' - ' + productData.away +
    '</div>' +
    '<div class="col-xs-12 collapse" id="game-details'+productData.id+'">' +
        '<hr>' +
        '<p>' + productData.date +'</p>' +
        '<p>' + productData.starttime + ' - ' + productData.stoptime + '</p>' +
        '<p>€' + productData.price + '</p>' +
        '<button class="btn btn-special btn-block" type="button">Köp</button>' +
    '</div>' +
    '</div>';
    // $('#team-upcoming-games').html(productDetailBox);
    return productDetailBox;
}

// Displays all the products returned from the database
function createProductViewHtml(productList, team) {
    var productViewBox = '<div class="row text-center">' +
        '<h1 class="col-md-12">' + team + '</h1>';
    for (var i = 0; i < productList.length; i++) {
        var pDetails = createProductDetailHtml(productList[i]);
        productViewBox += pDetails;
    }
    productViewBox += '</div>';
    $('#team-upcoming-games').html(productViewBox);

}

$(document).ready(function () {

    var productList = [];
    for (var i = 0; i < 20; i++) {
        productList[i] = createDummyProduct(i);
    };
    createProductViewHtml(productList, 'Napoli');
    
    $('.sport-toggle').click(function (e) { 
        e.preventDefault();
        toggleActive(this);
    });

    $('.league-toggle').click(function (e) { 
        e.preventDefault();
        toggleActive(this);
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
                for (var key in response) {
                    // TODO: registration success message to user
                    console.log(key);
                    console.log(response);
                }
            }
        });
    });

    // GET all products of chosen league and team
    $('.teamSelect').click(function (e) { 
        e.preventDefault();

        // TODO: create object from league and team selection
        // Store last clicked league/team in variables?
        var d = {
            team: 'Napoli',
            league: 'Premier League'
        };

        $.ajax({
            type: "GET",
            url: "http://localhost/buysporttv/api/product.php",
            data: d,
            success: function (response) {
                var returnedProducts = JSON.parse(response);
                createProductViewHtml(returnedProducts, 'Napoli')
            }
        });
    });
});


