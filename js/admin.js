/**
 * script operations for admin functionality
 */
function getProductId(childElement) {
    return $(childElement).parent().data('id');
}

$(document).ready(function () {

    // Delete product from database
    $('tbody').on('click', '.deleteProduct', function(e) {
        e.preventDefault();
        let button = this;
        let id = getProductId(button);
        $.ajax({
            type: "POST",
            url: rootUrl + "/api/delete_product.php",
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

    // Add product to database
    $('tbody').on('click', '.addProduct', function(e) {
        e.preventDefault();
        let button = this;
        let newProduct = {
            type: $('.inputType').val(),
            league: $('.inputLeague').val(),
            home: $('.inputHome').val(),
            away: $('.inputAway').val(),
            startdate: $('.inputStartDate').val(),
            stopdate: $('.inputStopDate').val(),
            price: $('.inputPrice').val()
        };
        // let id = getProductId(button);
        $.ajax({
            type: "POST",
            url: baseUrl + "add_product.php",
            data: newProduct,
            dataType: "json",
            success: function (response) {
                // Evaluate response: should give a number >= 0
                // That is the products id number
                // Otherwise return something like -1
                if (response >= 0) {
                    alert('Product added to database!');
                }
                else {
                    alert('Error: failed to add product to database');
                }
            },
            error: function(response) {
                console.log(response.responseText);
            }
        });
    });

    // Update database product
    $('tbody').on('click', '.updateProduct', function(e) {
        e.preventDefault();
        let button = this;
        let id = getProductId(button);
        let newProduct = {
            id: id,
            type: $('.inputType').val(),
            league: $('.inputLeague').val(),
            home: $('.inputHome').val(),
            away: $('.inputAway').val(),
            startdate: $('.inputStartDate').val(),
            stopdate: $('.inputStopDate').val(),
            price: $('.inputPrice').val()
        };

        $.ajax({
            type: "POST",
            url: baseUrl + "update_product.php",
            data: newProduct,
            dataType: "json",
            success: function (isAdded) {
                if (isAdded === true) {
                    alert('Product updated!')
                }
                else {
                    alert('Error: ')
                }
            },
            error: function(response) {
                console.log(response.responseText);
            }
        });
    });
});