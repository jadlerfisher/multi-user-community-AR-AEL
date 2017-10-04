	 //Google Map variables 
     var map;
     var panorama;
     var myLocation;

     //My api key if needed for links
     var APIkey= "AIzaSyADipq2TSw57kMS8I6tnnNadLWz2mjvN5c";

     //THREE.js stuff
     var mesh; 
	 var fov = 80;
     var scene;
     var camera;

	 //Initalize the map and streetview
     function initMap() {
     	var agbar = new google.maps.LatLng(33.7756, -84.3963);

        panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));

        // Set up the map.
        map = new google.maps.Map(document.getElementById('map'), {
          center: agbar,
          zoom: 16,
        });

		//Pegman
		panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), {
            position: agbar,
            pov: {
            heading: 34,
            pitch: 10
            }
		});
		myLocation = agbar;
		map.setStreetView(panorama);

		// Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });
	
		var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });


        //eventlistener whenever the user clicks the map, finds nearest pano within radius 50
        var sv = new google.maps.StreetViewService();
        map.addListener('click', function(event) {
          sv.getPanorama({location: event.latLng, radius: 50}, processSVData);
        });
		
     } //initMap
	

    //Use my location button requests user's current place
    window.onload = function(){

				var el = document.getElementById( 'myLocationButton' );
						el.addEventListener( 'click', function( event ) {
						event.preventDefault();
						navigator.geolocation.getCurrentPosition(geoSuccess);
					}, false );
				navigator.pointer = navigator.pointer || navigator.webkitPointer;
					
	} //onLoad


	//If user clicks use my location button and clicks a place on the map, returns closest pano within raidus 50
	function geoSuccess( position ) {
		
		var currentLocation = new google.maps.LatLng( position.coords.latitude, position.coords.longitude );
		map.panTo( currentLocation );
		// Look for a nearby Street View panorama when the map is clicked.
        // getPanoramaByLocation will return the nearest pano when the
        // given radius is 50 meters or less.
        var sv = new google.maps.StreetViewService();
        map.addListener('click', function(event) {
          sv.getPanorama({location: event.latLng, radius: 50}, processSVData);
        });
		myLocation = currentLocation;     	
	} //geoSuccess


	//Updates streetview pano, if no location found nearby, logs it
	function processSVData(data, status) {
	        if (status === 'OK') {
	          panorama.setPano(data.location.pano);
	          panorama.setPov({
	            heading: 270,
	            pitch: 0
	          });
	          panorama.setVisible(true);

	        } else {
	          console.log('Street View data not found for this location.');
	        }
	}//processSVData


	//Experimenting with Collin's GSVPano.js
  	function loadPanorama( location ) {
            

                    loader = new GSVPANO.PanoLoader( {
                        useWebGL: false,
                        zoom: 3
                    } );
					scene = new THREE.Scene();
							
					camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, 1, 1100 );
					scene.add( camera );
							
					// create sphere for streetview behind painting surface
							
					mesh = new THREE.Mesh( new THREE.SphereGeometry( 500, 60, 40 ), new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( '../public/assets/images/placeholder.jpg' ) } ) );
					mesh.scale.x = -1;
					scene.add( mesh );	
                    loader.onPanoramaLoad = function() {
                        
                        window.location.hash = location.lat() + ',' + location.lng();
                    
                        var source = this.canvas[ 0 ];
                        mesh.material.map = new THREE.Texture( source ); 
                        mesh.material.map.needsUpdate = true;
                        
                    };

                    loader.load( location );
                
    } //loadpanorama

	