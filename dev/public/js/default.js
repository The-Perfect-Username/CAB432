$(document).ready(function() {

	$("form").on("submit", function(e) {
		e.preventDefault();
		var value = $("input#search-bar").val();
		$.ajax({
    		type: 'GET',
    		url: "http://localhost:3000/yelp/bylocation/bars/" + value,
    		success: function(data) {
    			var result = data[0].rating + ", " + data[0].name;
    			var len = data.length;
    			console.log(len);
    			var t = thing(data);
    			$('div#text').html(t);
    		}
    	});

	});

    $(document).on("click", "#delete-icon", function() {
        $("#search-bar").val("");
    });

    $(document).on("click", "#search-icon", function() {
        $("form").submit();
    });

	function thing(data) {
        var html = "";
        var result;
        var name, rating_img, num_of_reviews, preview_image, address, url, coords;
        for (var i = 0; i < data.length; i++) {
            rating_img = data[i].rating_img_url;
            name = data[i].name; 
            num_of_reviews = data[i].review_count;
            address =  data[i].location.display_address[0] + ", " + data[i].location.display_address[1];
            preview_image = data[i].image_url;
            url = data[i].url;
            coords = data[i].location.coordinate.latitude + "," + data[i].location.coordinate.longitude;
            html += result_design(name, rating_img, num_of_reviews, address, preview_image, url, coords);
        }
        return html;
    }

    function result_design(name, rating, reviews, address, preview, url, coords) {
        html = "<div class='result' rel='" + coords + "'>";
        html += "<div class='result-info'>";
        html += "<h4 class='result-name'>" + name + "</h4>";
        html += "<ul class='inline-list'>";
        html += "<li class='inline-item'>";
        html += "<span><img src='" + rating + "' alt='rating'></span>";
        html += "</li>"
        html += "<li class='inline-item light-grey'>";
        html += "(" + reviews + ")";
        html += "</li>";
        html += "<li class='inline-item light-grey'>";
        html += "<a class='yelp-link light-grey' href='" + url + "' target='_blank' title='View on Yelp'><i class='fa fa-yelp' aria-hidden='true'></i></a>";
        html += "</li>";
        html += "</ul>";
        html += "<p class='address-info grey'>" + address + "</p>";
        html += "</div>";
        html += "<div class='image-wrapper'>";
        html += "<img class='preview-img' src='" + preview + "' />";
        html += "</div>";
        html += "</div>";

        return html;
    }
});
var markers = {};
function show_result_icon_on_click(map) {
    $(document).on("click", ".result", function() {
        remove_marker(markers);
        var coords = $(this).attr("rel");
        coords     = coords.split(",");
        var latitude = parseFloat(coords[0]);
        var longitude = parseFloat(coords[1]);
        var pos = {
            lat: latitude,
            lng: longitude
        };
        // Creates a new marker
        var marker = new google.maps.Marker({
            id: 1,
            position: pos,
            map: map
        });

        markers[0] = marker;
    });
}

function remove_marker(markers) {
    if (markers[0]) {
        markers[0].setMap(null);
        delete markers[0];
    }
}
