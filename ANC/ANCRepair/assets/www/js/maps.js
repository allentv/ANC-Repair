$( "#RequestAssistanceScreen" ).live( "pageinit", function() {
	var map;	
	var defaultLatLng = new google.maps.LatLng(53.339728, -6.239223);
	
	if ( navigator.geolocation ) {
		function success(pos) {
			// Location found, show coordinates on map
			drawMap(new google.maps.LatLng(
			pos.coords.latitude, pos.coords.longitude));
		}
		
		function fail() {
			drawMap(defaultLatLng); // Show default map
		}
		
		// Find users current position
		navigator.geolocation.getCurrentPosition(success, fail,
		{
			enableHighAccuracy:true, timeout: 6000, maximumAge: 500000});
	} else {
		drawMap(defaultLatLng); // No geolocation support
	}
		
	function drawMap(latlng) {
		var myOptions = {
			zoom: 15,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
		
		var myMarker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: "I am here",
			draggable: true
		});
		
		google.maps.event.addListener(myMarker, 'dragend', function(evt){
			document.getElementById("myLocationField").value = myMarker.position;
		});
		
		var request = {
		    location: latlng,
		    radius: 5000,
		    types: ['gas_station']
		};
		
		var service = new google.maps.places.PlacesService(map);
		service.nearbySearch(request, mapSearchCallback);
		
		/*
		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: "I am here"
		});
		*/
	}
	
	function mapSearchCallback(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				var marker = new google.maps.Marker({
					position: results[i].geometry.location,
					map: map,
					title: results[i].name
				});
				
				var iconFile = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
				marker.setIcon(iconFile) 
		    }
		}
	}
});
