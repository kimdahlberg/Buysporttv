/**
 * script operations for admin functionality
 */
function getProductId(childElement) {
    return $(childElement).parent().data('id');
}

$(document).ready(function () {
    initializeAdmin();

    // Fill update modal with selected products current values
    $('tbody').on('click', '.glyphicon-pencil', function(e){
        let product = $(this).parent().data('product');
        console.log(product);
        $('#idUpdate').data('id', product.id);
        $('#inputTypeUpdate').val(product.type);
        $('#inputLeagueUpdate').val(product.league);
        $('#inputHomeUpdate').val(product.home);
        $('#inputAwayUpdate').val(product.away);
        $('#inputStartDateUpdate').val(product.startdate);
        $('#inputStopDateUpdate').val(product.stopdate);
        $('#inputPriceUpdate').val(product.price);
    })

    // Delete product from database
    $('tbody').on('click', '.glyphicon-trash', function(e) {
        e.preventDefault();
        let button = this;
        let product = $(button).parent().data('product');
        console.log(button);
        console.log(id);
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
    $('#addModal').on('click', '.addButton', function(e) {
        e.preventDefault();
        let button = this;
        let newProduct = {
            type: $('#inputTypeAdd').val(),
            league: $('#inputLeagueAdd').val(),
            home: $('#inputHomeAdd').val(),
            away: $('#inputAwayAdd').val(),
            startdate: $('#inputStartDateAdd').val(),
            stopdate: $('#inputStopDateAdd').val(),
            price: $('#inputPriceAdd').val()
        };
        // let id = getProductId(button);
        $.ajax({
            type: "POST",
            url: rootUrl + "/api/add_product.php",
            data: newProduct,
            dataType: "json",
            success: function (response) {
                // Evaluate response: should give a number >= 0
                // That is the products id number
                // Otherwise return something like -1
                if (response >= 0) {
                    alert('Product added to database!');
                    // Reload products
                    initializeAdmin();
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
    $('#updateModal').on('click', '.updateButton', function(e) {
        e.preventDefault();
        let button = this;
        let product = $(button).parent().data('product');
        console.log(product);
        let updateProduct = {
            id: $('#idUpdate').data('id'),
            type: $('#inputTypeUpdate').val(),
            league: $('#inputLeagueUpdate').val(),
            home: $('#inputHomeUpdate').val(),
            away: $('#inputAwayUpdate').val(),
            startdate: $('#inputStartDateUpdate').val(),
            stopdate: $('#inputStopDateUpdate').val(),
            price: $('#inputPriceUpdate').val()
        };
        console.log(updateProduct);

        $.ajax({
            type: "POST",
            url: rootUrl + "/api/update_product.php",
            data: updateProduct,
            dataType: "json",
            success: function (isUpdated) {
                if (isUpdated === true) {
                    alert('Product updated!');
                    // Reload products
                    initializeAdmin();
                }
                else {
                    alert('Error: failed to update product');
                }
            },
            error: function(response) {
                console.log(response.responseText);
            }
        });
    });
});