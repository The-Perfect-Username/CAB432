var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 14
	});

	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			
            var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: "You are here"
            });
            
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

	    console.log( latitude + ', ' + longitude );
	});
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
}