function initializeCart() {
    $.ajax({
        type: "GET",
        url: "http://localhost/buysporttv/api/products_premier_league.php",
        dataType: 'json',
        success: function (response) {
            $('#cart tbody').html(createCheckoutTableBodyHtml(response));
            let total = 0;
            for (let product of response) {
                total += parseInt(product.price);
            }
            console.log(total);
            $('.cart-total').html('<strong>Total: ' + total + ':-</strong>');
        }
    });
}