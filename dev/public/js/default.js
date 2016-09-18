// Global Variables
var search;
var markers = {};
// Error message for when the client is unable to process a request to the Yelp API
var search_error_response = "<p id='error'>Unable to process request.</p>";

//jQuery
$(document).ready(function() {

    // Search for businesses that have a specific search term related to them.
	$("form").on("submit", function(e) {
		e.preventDefault();
        // Get the current search term from the search input
        search = $("input").val();
        // Prevent any requests to go through if there are no search terms
        if (search == "" || search == null) return false;
        // Get business search results near the current searched area from the Yelp API
		$.ajax({
    		type: 'GET',
    		url: "yelp/bycoord/" + search + "/" + current_search_coords,
            beforeSend: function() {
                // Show spinner icon before data loads
                spinner_icon();
            },
            // Formats the data into HTML then displays the results
            // in the sidebar. Replaces the loading spinner in the
            // search bar with the X icon
    		success: function(data) {
    			var t = format_result_to_html(data);
    			$('div#result-content').html(t);
                x_icon();
    		}, error: function() {
                // Handle error
                $('div#result-content').html(search_error_response);
            }
    	});

	});
    // Searches for businesses but for sorted results
    $(document).on("click", ".search-by", function() {
        // Sort query value
        var sort = parseInt($(this).attr("rel"));
        // Get the current search term from the search input
        search   = $("input").val();
        // Prevent any requests to go through if there are no search terms
        if (search == "" || search == null) return false;
        // Gets sorted business search results near the current searched area from the Yelp API
        $.ajax({
            type: 'GET',
            url: "yelp/bycoord/" + search + "/" + current_search_coords + "/" + sort,
            beforeSend: function() {
                spinner_icon();
            },
            // Formats the data into HTML then displays the results
            // in the sidebar. Replaces the loading spinner in the
            // search bar with the X icon
            success: function(data) {
                var t = format_result_to_html(data);
                $('div#result-content').html(t);
                x_icon();
            }, error: function() {
                // Handle Error
                $('div#result-content').html(search_error_response);
            }
        });

    });    

    // Remove the search term from the search bar
    $(document).on("click", "#delete-icon", function() {
        $("#search-bar").val("");
    });
    // Submits the search form
    $(document).on("click", "#search-icon", function() {
        $("form").submit();
    });

    // Info button popover HTML
    // Provides information about how to use the application
    function popover_design() {
        var html = "<ul id='popover-list'>";
        html += " <li><b>Best Match</b> sorts results based off distance, reviews, and ratings.</li>";
        html += " <li><b>Distance</b> sorts results out by linear distance.</li>";
        html += " <li><b>Rating</b> returns the higher rated results first.</li>";
        html += " <li><b>Right click</b> on the map to set a new marker and find results near that area. Rightclick each green and blue marker to remove them from the map.</li>";
        html += " <li><b>Left click</b> on the marker to zoom in and center the map.</li>";
        html += " <li><b>Blue markers</b> denote the search location. <b>Green markers</b> denote the business' location.</li>";
        html += "</ul>";
        return html;
    }

    // Info button
    // Displays the popover when user hovers mouse over the button
    $("#info-circle-btn").hover(function () {
        $(this).popover({
            content: popover_design(),
            container: 'body',
            html: true
        }).popover('show');
    }, function () {
        $(this).popover('hide');
    });

});

function get_results_from_coords(latitude, longitude) {
    // Initialise jQuery to use the $.ajax function
    // when called in map.js
    $(function(){
        var coords            = latitude + ',' + longitude;
        coords                = coords.toString();
        current_search_coords = coords;
        search                = $("input").val();
        // Prevent any requests to go through if there are no search terms
        if (search == "" || search == null) return false;
        // Send the request to the Yelp API
        $.ajax({
            type: 'GET',
            url: "yelp/bycoord/" + search + "/" + coords,
            beforeSend: function() {
                // Show the spinner icon while waiting for the response
                spinner_icon();
            },
            // Formats the data into HTML then displays the results
            // in the sidebar. Replaces the loading spinner in the
            // search bar with the X icon
            success: function(data) {
                var t = format_result_to_html(data);
                $('div#result-content').html(t);
                x_icon();
            }, error: function() {
                // Handle error
                $('div#result-content').html(search_error_response);
            }

        });
        
    });
}

// Extracts the data result and inserts it into HTML
// The data retrieved is from the Yelp API and displays
// the business' name, address, number of reviews, the rating,
// and provides the business' latitude and longitiude coordindates
// as well as a link to its yelp page.
function format_result_to_html(data) {
    var html = "";
    // Number of businesses found
    var length = data.length;
    // Data variables
    var name, rating_img, num_of_reviews, preview_image, address, url, coords;
    // If there are results then extract the data and format it in HMTL, otherwise
    // display an error message stating there was nothing found.
    if (length > 0) {
        for (var i = 0; i < length; i++) {
            rating_img     = data[i].rating_img_url; // Star rating image
            name           = data[i].name;           // Name of the business
            num_of_reviews = data[i].review_count;   // Number of user reviews
            address        = data[i].location.display_address[0] + ", " + data[i].location.display_address[1]; // The street address and suburb
            url            = data[i].url; // Url to the dedicated Yelp page
            coords         = data[i].location.coordinate.latitude + "," + data[i].location.coordinate.longitude; // lat & lng coorindates
            uber_fare_estimate(i, current_client_position, coords);

            html += result_design(i, name, rating_img, num_of_reviews, address, url, coords);
        }
    } else {
        html = "<p id='error'>Nothing found</p>";
    }
    return html; // return the HTML implemetation to display the results
}

// HTML format of the search result.
// This will be used in the function 'format_result_to_html'
function result_design(id, name, rating, reviews, address, url, coords) {
    html = "<div class='result' rel='" + coords + "'>";
    html +=     "<div class='result-info'>";
    html +=         "<h4 class='result-name'>" + name + "</h4>";
    html +=         "<ul class='inline-list'>";
    html +=             "<li class='inline-item'>";
    html +=                 "<span><img src='" + rating + "' alt='rating'></span>";
    html +=             "</li>"
    html +=             "<li class='inline-item light-grey'>";
    html +=                 "(" + reviews + ")";
    html +=             "</li>";
    html +=             "<li class='inline-item light-grey'>";
    html +=                 "<a class='yelp-link light-grey' href='" + url + "' target='_blank' title='View on Yelp'>";
    html +=                 "<i class='fa fa-yelp' aria-hidden='true'></i></a>";
    html +=             "</li>";
    html +=             "<li class='inline-item light-grey'>";
    html +=                 "<span id='uber-fare-" + id + "' title='Uber fare estimates'>";
    html +=                 "<i id='uber-load-" + id + "' class='fa fa-spinner fa-spin' aria-hidden='true'></i></span>";
    html +=             "</li>";
    html +=             "<li class='inline-item light-grey'>";
    html +=                 "<span id='distance-" + id + "' title='Estimated travel distance'>";
    html +=                 "<i id='uber-load-" + id + "' class='fa fa-spinner fa-spin' aria-hidden='true'></i></span>";
    html +=             "</li>";
    html +=         "</ul>";
    html +=         "<p class='address-info grey'>" + address + "</p>";
    html +=     "</div>";
    html += "</div>";

    return html;
}

// Displays the business marker on the map when 
// the user clicks on a search result
function show_result_icon_on_click(map) {
    $(document).on("click", ".result", function() {

        // Clear any result markers on the map
        remove_marker(markers);
        
        // Get the coorindates of the business
        var coords = $(this).attr("rel");
        // Convert to array
        coords = coords.split(","); 
        // Parse cooridnates
        var latitude  = parseFloat(coords[0]);
        var longitude = parseFloat(coords[1]);

        // Set cooridnates as object
        var pos = {
            lat: latitude,
            lng: longitude
        };
        // Creates a new marker
        var marker = new google.maps.Marker({
            id: 1,
            icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            position: pos,
            map: map
        });

        // Add marker to the array
        markers[0] = marker;

        // Add event handler to remove the marker when right-clicked
        google.maps.event.addListener(marker,'rightclick', function() {
            remove_marker(markers);
        });

    });   
}

// Converts miles to kilometres
function m2km(miles) {
    return (miles * 1.6093).toFixed(2);  // returns a string
}

// Returns a Uber travel distance and fare estimate between two points
// id: ID value of the HTML element
// start: client's coordinates as a string
// end: business' coordinates as a string
function uber_fare_estimate(id, start, end) {
    var error_code = 422;
    $(function() {
        // Send an ajax request to the Uber API
        $.ajax({
            type: 'GET',
            url: "uber/fare/" + start + "/" + end,
            success: function(data) {
                // Remove the loading icons
                $("i#uber-load-" + id).remove();
                // Inject the data from the Uber API into the HTML elements
                if (data.statusCode != error_code) {
                    $("span#uber-fare-" + id).text("$" + data.prices[0].low_estimate + " - $" + data.prices[0].high_estimate);
                    $("span#distance-" + id).text(m2km(parseFloat(data.prices[0].distance)) + " km");
                }
            }
        });
    });
}

// Removes business markers from the map
function remove_marker(markers) {
    // Checks if there are any existing markers
    if (markers[0]) {
        // Removes all business markers from the map and the array
        markers[0].setMap(null);
        delete markers[0];
    }
}

// Replaces the X icon with the spinner icon
// Used for displaying a loading icon in the search bar
function spinner_icon() {
    $("i.fa-times").addClass("fa-spinner fa-spin main-spinner");
    $("i.main-spinner").removeClass("fa-times");
}

// Replaces the spinner icon with the X icon
// Used to show the delete button
function x_icon() {
    $("i.main-spinner").addClass("fa-times");
    $("i.fa-times").removeClass("fa-spinner fa-spin main-spinner");
    
}

