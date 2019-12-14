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
var randomId = 15;

months = { 'Jan':1, 'Feb':2, 'Mar':3, 'Apr':4, 'May':5, 'June':6, 'July':7, 'Aug':8, 'Sept':9, 'Oct':10, 'Nov': 11, 'Dec':12 }

// here the ajax request to know what airports to list under the origin input
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

// here the ajax request to know what airports to list under the destination input
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

// this section allows auto completion for the origin/destination inputs
$(document).on('click', 'li', function(){
    $(this).parent().prev().val($(this).text());
    $(this).parent().css('display','none');

});

// the name is confusing so should be changed, this ajax request will add a flight to a trip
$('.research-flight').click(function(){

    let origin = $('.origin').val();
    let destination = $('.destination').val();
    let date = $('.date-trip').val().split('-');
    date = date[2]+'.'+date[1]+'.'+date[0];

    // here id to identify the trip id random as I don't have information about the user so far,
    // i could store a random one in the local storage though
    path = '/add/flight/'+date+'&'+origin+'&'+destination+'&'+randomId;
    console.log(path);

    $.ajax({
        url: path,
        data: {'date': $('.date-trip').val(),
            'origin': $('.origin').val(),
            'destination':$('.date-trip').val(),
            'id':12
        },
        success: function (result) {
            console.log('yep');
        },
    });
});

// this request will list the flight for a certain trip_id given
$('.display-flights-cta').click(function(){
    path = "/get_flight/"+randomId;
    $.ajax({
        url: path,
        success: function (result) {
            let flights= JSON.parse(result);

            $('.trip-listing').html('<table class="trip-listing-table"><tr>\<th>Origin</th><th>Destination</th><th>Date</th><th><i class="fas fa-times"></i></th></tr>')
            for(i=0 ; i < flights.length; i++){
                let dateInMs = ((flights[i].date.timestamp))*1000;
                let thisdate = new Date(dateInMs).toString();
                let splitedDate = thisdate.split(' ');
                formatedDate = splitedDate[2]+'/'+months[splitedDate[1]]+'/'+splitedDate[3];
                $('.trip-listing-table').append('<tr class="trip-line-'+flights[i].id+'"><th>'+flights[i].origin+'</th><th>'+flights[i].destination+'</th><th>'+formatedDate+'</th><th><i class="delete-flight fas fa-times flight-id-'+flights[i].id+'"></i></th></tr>')
            }
        },
    });
});

// this request will delete the flight with a given id
$(document).on('click','.delete-flight',function(){
    let crossClasses = $(this).attr('class').split(' ');
    for (i=0; i< crossClasses.length ; i++){
        if (crossClasses[i].includes('flight-id')){
            var flightIdToDelete= crossClasses[i].split('-')[2];
            path = '/remove/flight/'+flightIdToDelete;
            var tripLineToRemove = '.trip-line-'+flightIdToDelete;
            $(tripLineToRemove).remove();
            $.ajax({
                url: path,
                success:function(result){
                    $(tripLineToRemove).remove();
                }
            });
            break;
        }
    }
});