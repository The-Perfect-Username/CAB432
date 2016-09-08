var map;
var marker;

function initMap() {
	//var marker;
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 14
	});

	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			
			// Coordinates of the client's current position
            var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			// Creates a new marker
			var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: "You are here"
            });

			ajax_instance(pos.lat, pos.lng);
			/*
			An event listener that zooms towards the marker the user clicks on.
			Only used for the first marker shown on the map which shows the current
			position of the client.
		    */
            google.maps.event.addListener(marker,'click',function() {
            	var latitude = pos.lat;
			    var longitude = pos.lng;

				map.setZoom(15);
				map.setCenter(marker.getPosition());

				ajax_instance(latitude, longitude);

			});	

            // Sets the map center
			map.setCenter(pos);

		}, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}

	google.maps.event.addListener(map, "rightclick", function (event) {
	    var latitude = event.latLng.lat();
	    var longitude = event.latLng.lng();
	    var myLatLng = {lat: latitude, lng: longitude};
	    
	    var marker = new google.maps.Marker({
			position: myLatLng,
			map: map
        });

	    /*
		An event listener that zooms towards the marker the user clicks on.
		Only used for new markers added to the map.
	    */
        google.maps.event.addListener(marker,'click',function() {
			map.setZoom(15);
			map.setCenter(marker.getPosition());
			ajax_instance(latitude, longitude);

		});	


	    ajax_instance(latitude, longitude);

	    
	    
	    
	});

	function ajax_instance(latitude, longitude) {
		    	// jQuery
		    $(function(){
		    	var coords = latitude + ',' + longitude;
		    	coords = coords.toString();
		    	$.ajax({
		    		type: 'GET',
		    		url: "http://localhost:3000/yelp/bycoord/bars/" + coords,
		    		success: function(data) {
		    			var result = data[0].rating + ", " + data[0].name;
		    			var len = data.length;
		    			console.log(len);
		    			var t = thing(data);
		    			$('div#text').html(t);
		    		}

		    	});
		    	console.log( latitude + ', ' + longitude );
		    	
		    });
	    }

	    function thing(data) {
	    	var html = "";
	    	var result;
	    	var name, rating_img, num_of_reviews, preview_image, address;
	    	for (var i = 0; i < data.length; i++) {
	    		rating_img = data[i].rating_img_url;
	    		name = data[i].name; 
	    		num_of_reviews = data[i].review_count;
	    		address =  data[i].location.display_address[0] + ", " + data[i].location.display_address[1];
	    		preview_image = data[i].image_url;
	    		html += result_design(name, rating_img, num_of_reviews, address, preview_image);
	    	}
	    	return html;
	    }

	    function result_design(name, rating, reviews, address, preview) {
	    	html = "<div class='result'>";
	    	html += "<div class='result-info'>";
			html += "<h4 class='result-name'>" + name + "</h4>";
			html += "<ul class='inline-list'>";
			html += "<li class='inline-item'>";
			html += "<span><img src='" + rating + "' alt='rating'></span>";
			html += "</li>"
			html += "<li class='inline-item light-grey'>";
			html += "(" + reviews + ")";
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


}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
}