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

	function thing(data) {
    	var html = "";
    	var result;
    	var rating_img;
    	for (var i = 0; i < data.length; i++) {
    		rating_img = "<img src='" + data[i].rating_img_url + "' alt='ratings' />";
    		result = data[i].name + ", Reviews: " + data[i].review_count + ", Address: " + data[i].location.display_address[0] + ", " + data[i].location.display_address[1];
    		html += "<div class='result'><p>" + result + "</p>" + rating_img + "</div>";
    	}

    	return html;
    }

});