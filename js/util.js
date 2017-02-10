
function parseDate(dateObject) {
    return $.format.date(dateObject, "dd-MM-yyyy");
}

function parseTime(dateObject) {
    return $.format.date(dateObject, "HH:mm");
}

