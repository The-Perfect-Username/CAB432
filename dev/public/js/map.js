// Global Variables
var map;
var marker, markerArray = [];
var current_search_coords;
var current_client_position;
var current_marker;

// Initialise Google Maps
function initMap() {

	// New map object
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
			// Store client's current esitmated position to be used for estimating Uber fares and distance
			// in default.js
			current_client_position = pos.lat + "," + pos.lng;
			// Creates a new marker
			var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: "You are here"
            });

            current_marker = marker;

			get_results_from_coords(pos.lat, pos.lng);
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

				get_results_from_coords(latitude, longitude);

			});	

            // Sets the map center
			map.setCenter(pos);

		}, function() {
			handleLocationError(true, map);
		});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, map);
	}

	/* Rightclick on map to add a new marker and get search results related to that area */
	google.maps.event.addListener(map, "rightclick", function (event) {
		remove_marker(markers);
	    var latitude = event.latLng.lat();
	    var longitude = event.latLng.lng();
	    var myLatLng = {lat: latitude, lng: longitude};
	    
	    var marker = new google.maps.Marker({
	    	id: "locfind",
	    	icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
			position: myLatLng,
			map: map
        });

        current_marker = marker;

        markerArray.push(marker);

	    /*
		An event listener that zooms towards the marker the user clicks on.
		Only used for new markers added to the map.
	    */
        google.maps.event.addListener(marker,'click', function() {
        	
			map.setZoom(15);
			map.setCenter(marker.getPosition());
			if (current_marker != this) {
				current_marker = this;
				get_results_from_coords(latitude, longitude);
			}

		});

        // Remove the marker when rightclicked. All other markers will remain.
		google.maps.event.addListener(marker,'rightclick', function() {
			if (this.id == "locfind") {
				var index = markerArray.indexOf(this);
				markerArray.splice(index,1);
				this.setMap(null);
			}
		});

        // Get search results from the coordinates
	    get_results_from_coords(latitude, longitude);
	    
	});

    show_result_icon_on_click(map);

}

// Handles the geolocation error if the geolocation encounters an error
function handleLocationError(browserHasGeolocation, map) {
	// Coordinates of Brisbane Center
	var Brisbane_Coordinates = {lat: -27.3818631, lng: 152.7130056};
	map.setZoom(13);
	map.setCenter(Brisbane_Coordinates);
	// Display the error result in the sidebar
	document.getElementById("result-content").innerHTML = browserHasGeolocation ?
		'<p id="error">Error: The Geolocation service failed. Please allow your browser to know your location.</p>' :
		'<p id="error">Error: Your browser doesn\'t support geolocation.</p>';
}