var map;
var marker, markerArray = [];
var current_coords;
var current_position;

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
			
			current_position = pos.lat + "," + pos.lng;
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

	/* Rightclick on map to add a new marker and get search results related to that area */
	google.maps.event.addListener(map, "rightclick", function (event) {
		remove_marker(markers);
	    var latitude = event.latLng.lat();
	    var longitude = event.latLng.lng();
	    var myLatLng = {lat: latitude, lng: longitude};
	    
	    var marker = new google.maps.Marker({
	    	id: "locfind",
			position: myLatLng,
			map: map
        });

        markerArray.push(marker);

	    /*
		An event listener that zooms towards the marker the user clicks on.
		Only used for new markers added to the map.
	    */
        google.maps.event.addListener(marker,'click', function() {
			map.setZoom(15);
			map.setCenter(marker.getPosition());
			ajax_instance(latitude, longitude);

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
	    ajax_instance(latitude, longitude);
	    
	});

	function ajax_instance(latitude, longitude) {
	    // jQuery
	    $(function(){
	    	var coords = latitude + ',' + longitude;
	    	coords = coords.toString();
	    	current_coords = coords;
	    	search = $("input").val();
	    	$.ajax({
	    		type: 'GET',
	    		url: "yelp/bycoord/" + search + "/" + coords,
	    		beforeSend: function() {
	    			spinner_icon();
	    		},
	    		success: function(data) {
	    			var result = data[0].rating + ", " + data[0].name;
	    			var len = data.length;
	    			var t = thing(data);
	    			$('div#text').html(t);
	    			x_icon();
	    		}

	    	});
	    	
	    });
    }

    show_result_icon_on_click(map);

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
}