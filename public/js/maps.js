
     /*
      * Click the map to set a new location for the Street View camera.
      */
     var map;
     var panorama;
	 var APIkey= "AIzaSyADipq2TSw57kMS8I6tnnNadLWz2mjvN5c";



     function initMap() {
        var gaTech = {lat: 33.7756, lng: -84.3963};
        var sv = new google.maps.StreetViewService();

        panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));

        // Set up the map.
        map = new google.maps.Map(document.getElementById('map'), {
          center: gaTech,
          zoom: 16,
        });
		
		// Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });
		
		//Pegman
		var agbar = new google.maps.LatLng(33.7756, -84.3963);
		panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), {
            position: agbar,
            pov: {
            heading: 34,
            pitch: 10
            }
		});
			map.setStreetView(panorama);
		
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
		
     } //initMap
		
		
		
		
		
//experimenting collin's code
		var mapElement = document.createElement('div');
		var subviewElements = [document.createElement('div'), document.createElement('div')];
		mapElement.style.pointerEvents = 'auto';
		// mapElement.style.visibility = 'hidden';
		mapElement.style.width = '100%';
		mapElement.style.height = '50%';
		mapElement.style.bottom = '0px';
		mapElement.id = 'map';
		subviewElements[0].style.pointerEvents = 'auto';
		subviewElements[0].style.width = '100%';
		subviewElements[0].style.height = '100%';
		subviewElements[1].style.width = '100%';
		subviewElements[1].style.height = '100%';

		var MapToggleControl = (function () {
			function MapToggleControl() {
				var _this = this;
				this.element = document.createElement('div');
				this._showing = false;
				// Set CSS for the control border.
				var controlUI = document.createElement('div');
				controlUI.style.backgroundColor = '#222';
				controlUI.style.opacity = '0.8';
				controlUI.style.borderRadius = '3px';
				controlUI.style.cursor = 'pointer';
				controlUI.style.marginRight = '10px';
				controlUI.style.marginTop = '10px';
				controlUI.style.textAlign = 'center';
				controlUI.title = 'Click to toggle the map';
				this.element.appendChild(controlUI);
				// Set CSS for the control interior.
				var controlText = this.controlText = document.createElement('div');
				controlText.style.color = '#fff';
				controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
				controlText.style.fontSize = '12px';
				controlText.style.lineHeight = '38px';
				controlText.style.paddingLeft = '10px';
				controlText.style.paddingRight = '10px';
				controlText.innerHTML = 'Show Map';
				controlUI.appendChild(controlText);
				// Setup the click event listeners: simply set the map to Chicago.
				controlUI.addEventListener('click', function () {
					_this.showing = !_this.showing;
				});
			}
			Object.defineProperty(MapToggleControl.prototype, "showing", {
				get: function () {
					return this._showing;
				},
				set: function (value) {
					this._showing = value;
					if (value) {
						this.controlText.innerHTML = 'Hide Map';
					}
					else {
						this.controlText.innerHTML = 'Show Map';
					}
				},
				enumerable: true,
				configurable: true
			});
			return MapToggleControl;
		}());
		// google street view is our "renderer" here, so we don't need three.js
		var map;
		var streetviews;
		var currentPanoData;
		var mapToggleControl = new MapToggleControl();
		// The photosphere is a much nicer viewer, though it breaks if we 
		// programmatically modify the POV while it is transitioning between panorams.
		// For this reason, we will (later) restrict navigation to a manual panning mode.
		google.maps.streetViewViewer = 'photosphere';
		window.addEventListener('load', function () {
			map = new google.maps.Map(mapElement);
			streetviews = [
				new google.maps.StreetViewPanorama(subviewElements[0]),
				new google.maps.StreetViewPanorama(subviewElements[1])
			];
			map.setStreetView(streetviews[0]);
			// Enable the pan control so we can customize to trigger device orientation based pose
			streetviews[0].setOptions({ panControl: true, zoomControl: false });
			streetviews[0].controls[google.maps.ControlPosition.TOP_RIGHT].push(mapToggleControl.element);
			// update the pano entity with the appropriate pose
			var elevationService = new google.maps.ElevationService();
			var elevation = 0;
			google.maps.event.addListener(streetviews[0], 'position_changed', function () {
				var position = streetviews[0].getPosition();
				// update the position with previous elevation
				
		   
				// update the position with correct elevation as long as we haven't moved
				elevationService.getElevationForLocations({ locations: [position] }, function (results, status) {
					if (status = google.maps.ElevationStatus.OK) {
						if (google.maps.geometry.spherical.computeDistanceBetween(results[0].location, position) < 10) {
							elevation = results[0].elevation;
						   
						}
					}
				});
			});

			var streetViewService = new google.maps.StreetViewService();
			navigator.geolocation.getCurrentPosition(function (position) {
				var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				streetViewService.getPanorama({
					location: coords,
					radius: 1500,
					preference: google.maps.StreetViewPreference.NEAREST,
				}, function (data, status) {
					if (status === google.maps.StreetViewStatus.OK) {
						currentPanoData = data;
						map.setCenter(data.location.latLng);
						map.setZoom(18);
						map.setOptions({ streetViewControl: true });
						elevation = position.coords.altitude || 0;
						streetviews[0].setPano(data.location.pano);
						// streetviews[1].setPano(data.location.pano);
						// Position the eye as a child of the pano entity
					}
					else if (status === google.maps.StreetViewStatus.ZERO_RESULTS) {
						// unable to find nearby panorama (what should we do?)
						alert('Unable to locate nearby streetview imagery.');
					}
					else {
						alert('Error retrieving panorama from streetview service');
					}
				});
			}, function (e) {
				alert(e.message);
			}, {
				enableHighAccuracy: true
			});
		});
		
//end collins code