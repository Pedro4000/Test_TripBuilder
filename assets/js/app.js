/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */


// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.css');
require('../css/tripBuilder.scss');

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
const $ = require('jquery');

console.log('yo');
var path = "/get_airports";
$('.origin').on('input',function() {

    $.ajax({
        url: "/get_airports",
        data: {'query': $('.origin').val()},
        success: function (result) {
            airports = JSON.parse(result);

            if (airports.length > 0 && $('.origin').val() != '') {
                $('.ul-airports-origin').empty();
                $('.ul-airports-origin').css('display', 'block');
                for (i = 0; i < airports.length; i++) {
                    $('.ul-airports-origin').append('<li>' + airports[i]['Municipality'] + '</li>');
                }
            } else {
                $('.ul-airports-origin').empty();
                $('.ul-airports-origin').css('display', 'none');
            }
        },
    });
});

$('.destination').on('input',function(){

    $.ajax({
        url: "/get_airports",
        data: {'query': $('.destination').val()},
        success: function (result) {
            airports = JSON.parse(result);
            console.log(airports);
            if (airports.length > 0 && $('.destination').val() != '') {
                $('.ul-airports-destination').empty();
                $('.ul-airports-destination').css('display', 'block');
                for (i = 0; i < airports.length; i++) {
                    $('.ul-airports-destination').append('<li>' + airports[i]['Municipality'] + '</li>');
                }
            } else {
                $('.ul-airports-destination').empty();
                $('.ul-airports-destination').css('display', 'none');
            }
        },
    });
});

$('.ul-airports-destination li ').on('click',function(){
    console.log(this);
    console.log('bien sur');
});

$('.ul-airports-origin li ').on('click',function(){
    console.log(this);

});

$('li').click(function(){
    console.log(this);
    console.log('ok');

});

$('.research-flight').click(function(){

    console.log($('.origin').val());
    console.log($('.destination').val());
    console.log($('.date-trip').val());

    $.ajax({
        url: "/addflight",
        data: {'date': $('.date-trip').val(),
            'origin': $('.origin').val(),
            'destination':$('.date-trip').val(),
            'id':12
        },
        success: function (result) {
            console.log('yolo');
        },
    });


});