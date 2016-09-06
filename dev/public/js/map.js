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

	    function thing(data) {
	    	var html = "";
	    	var result;
	    	var rating_img;
	    	for (var i = 0; i < data.length; i++) {
	    		rating_img = "<img src='" + data[i].rating_img_url + "' alt='ratings' />";
	    		result = i + 1 + ": " + data[i].name + ", Reviews: " + data[i].review_count + ", Address: " + data[i].location.display_address[0] + ", " + data[i].location.display_address[1] + ", " + data[i].location.coordinate.latitude + ", " + typeof data[i].location.coordinate.longitude;
	    		html += "<p>" + result + "</p>" + rating_img;

	    	}
	    	return html;
	    }
	    
	    
	});
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
}