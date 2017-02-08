



$.ajax({
    type: "POST",
    url: "http://localhost/buysporttv/api/signup.php",
    data: { 
        fname: 'Super',
        lname: 'Mario',
        femail: 'mushroom@wahoo.com',
        cemail: 'mushroom@wahoo.com',
        fpassword: 't0adSucks',
        cpassword: 't0adSucks'},
    success: function (response) {
        
    }
});