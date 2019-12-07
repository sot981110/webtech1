
function showHomeMessage(){
    $("#form").hide();
    $("#message").hide();
    $("#databaseTable").hide();
    $("#indexMessage").hide();
    $("#manufacturerCars").hide();
    $("#pictureSpace").hide();

    var formHtml =
        "<div id=\"form\"></div>\n" +
        "<div id=\"message\"></div>";
    $("#formSpace").html(formHtml);

    $("#indexMessage").show(0);
}

function showPictures(){
    $("#form").hide();
    $("#message").hide();
    $("#databaseTable").hide();
    $("#indexMessage").hide();
    $("#manufacturerCars").hide();
    $("#pictureSpace").hide();

    var formHtml =
        "<div id=\"form\"></div>\n" +
        "<div id=\"message\"></div>";
    $("#formSpace").html(formHtml);

    $("#pictureSpace").show(0);
}

function showCars(){
    $("#form").hide();
    $("#message").hide();
    $("#databaseTable").hide();
    $("#indexMessage").hide();
    $("#manufacturerCars").hide();
    $("#pictureSpace").hide();

    var formHtml =
        "<button onclick='showCarForm()'>Add Car</button> \n" +
        "<div id=\"form\"></div>\n" +
        "<div id=\"message\"></div>";
    $("#formSpace").html(formHtml);
    $("#databaseTable").show(600);

    $.ajax({
        dataType: "json",
        url: "http://localhost:8081/cars",
        success: function (data) {
            var contentTable = "<table class='dataTable'>" +
                "<th>Name</th>\n" +
                "<th>Consumption</th>\n" +
                "<th>Color</th>\n" +
                "<th>Manufacturer</th>\n" +
                "<th>Available</th>\n" +
                "<th>Year</th>\n" +
                "<th>Horsepower</th>\n";
            $.each(data, function (i) {
                contentTable +=
                    "<tr>" +
                    "<td>" + data[i].name  + " <button onclick='showManufacturerCars(\"" + data[i].manufacturer + "\")'>-)</button>" + "</td>" +
                    "<td>" + data[i].consumption + "</td>" +
                    "<td>" + data[i].color + "</td>" +
                    "<td>" + data[i].manufacturer + "</td>" +
                    "<td>" + data[i].available + "</td>" +
                    "<td>" + data[i].year + "</td>" +
                    "<td>" + data[i].horsepower + "</td>" +
                    "</tr>";
            });
            contentTable += "</table>";
            $("#databaseTable").html(contentTable);
        }
    });
}

function showManufacturers(){
    $("#form").hide();
    $("#message").hide();
    $("#databaseTable").hide();
    $("#indexMessage").hide();
    $("#manufacturerCars").hide();
    $("#pictureSpace").hide();

    var formHtml =
        "<button onclick='showManufacturerForm()'>Add Manufacturer</button> \n" +
        "<div id=\"form\"></div>\n" +
        "<div id=\"message\"></div>";
    $("#formSpace").html(formHtml);
    $("#databaseTable").show(600);

    $.ajax({
        dataType: "json",
        url: "http://localhost:8081/manufacturers",
        success: function (data) {
            var contentTable = "<table class='dataTable'>" +
                "<th>Name</th>\n" +
                "<th>Country</th>\n" +
                "<th>Founded</th>\n";
            $.each(data, function (i) {
                contentTable +=
                    "<tr>" +
                    "<td>" + data[i].name  + " <button onclick='showManufacturerCars(\"" + data[i].name + "\")'>-)</button>" + "</td>" +
                    "<td>" + data[i].country + "</td>" +
                    "<td>" + data[i].founded + "</td>" +
                    "</tr>";
            });
            contentTable += "</table>";
            $("#databaseTable").html(contentTable);
        }
    })
}

function showCarForm(){
    $("#form").hide();
    $("#message").hide();
    $("#databaseTable").hide();
    $("#indexMessage").hide();
    $("#manufacturerCars").hide();
    $("#pictureSpace").hide();

    var formHtml =
        "<button onclick='showCars()'>Show Cars</button> \n" +
        "<div id=\"form\"></div>\n" +
        "<div id=\"message\"></div>";
    $("#formSpace").html(formHtml);

    $("#form").load("formTemplates/carForm.html");
    $("#formSpace").show(0);
}

function showManufacturerForm(){
    $("#form").hide();
    $("#message").hide();
    $("#databaseTable").hide();
    $("#indexMessage").hide();
    $("#manufacturerCars").hide();
    $("#pictureSpace").hide();

    var formHtml =
        "<button onclick='showManufacturers()'>Show Manufacturers</button> \n" +
        "<div id=\"form\"></div>\n" +
        "<div id=\"message\"></div>";
    $("#formSpace").html(formHtml);

    $("#form").load("formTemplates/manufacturerForm.html");
    $("#formSpace").show(0);
}

function addNewCar(){
    var form = $("#addCar").serializeArray();
    var url = "/addCar";
    $.ajax({
        type: "POST",
        url: url,
        data: form,
        statusCode: {
            409: function() {
                $("#message").html("Error: A car is in the DB with the same name.");
            }
        },
        success: function (data) {
            $("#message").html("SUCCESS: The car had been added to the DB successfully.");
        }
    });
    $("#message").show(600);
}

function addNewManufacturer(){
    var form = $("#addManufacturer").serializeArray();
    var url = "/addManufacturers";
    $.ajax({
        type: "POST",
        url: url,
        data: form,
        statusCode: {
            409: function () {
                $("#message").html("Error: A manufacturer is in the DB with the same name.");
            }
        },
        success: function (data) {
            $("#message").html("SUCCESS: The manufacturer had been added to the DB successfully.");
        }
    });
    $("#message").show();
}

function showManufacturerCars(manufacturer){
    $("#form").hide();
    $("#message").hide();
    $("#databaseTable").hide();
    $("#indexMessage").hide();
    $("#manufacturerCars").hide();
    $("#pictureSpace").hide();


    $("#databaseTable").show(600);
    $("#manufacturerCars").show(600);

    document.cookie = "name="+manufacturer;
    $.ajax({
        type: "GET",
        url: "/manufacturer",
        dataType: "json",
        success: function (data) {
            var manufacturerCars = "<table class='dataTable'>" +
                "<th>Name</th>\n" +
                "<th>Consumption</th>\n" +
                "<th>Color</th>\n" +
                "<th>Manufacturer</th>\n" +
                "<th>Available</th>\n" +
                "<th>Year</th>\n" +
                "<th>Horsepower</th>\n";
            $.each(data, function (index) {
                manufacturerCars +=
                    "<tr>" +
                    "<td>" + data[index].name + "</td>" +
                    "<td>" + data[index].consumption + "</td>" +
                    "<td>" + data[index].color + "</td>" +
                    "<td>" + data[index].manufacturer + "</td>" +
                    "<td>" + data[index].available + "</td>" +
                    "<td>" + data[index].year + "</td>" +
                    "<td>" + data[index].horsepower + "</td>" +
                    "</tr>";
            });
            manufacturerCars += "</table>";
            $("#manufacturerCars").html(manufacturerCars);
        }
    });
}



