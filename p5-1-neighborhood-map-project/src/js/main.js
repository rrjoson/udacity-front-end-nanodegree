function ViewModel() {

	// Data
	var self = this;

	self.map = null;
	self.apiSuccessful = null;
	self.currentInfoWindow = null;
	self.markers = ko.observableArray();

	self.query = ko.observable("");
	self.results = ko.observableArray();

	self.filterLocations = function() {
		var results = [];

		var query = self.query().toLowerCase();

		data.forEach(function(location) {
			if (location.name.toLowerCase().includes(query)) {
				results.push(location);
			}
		});

		return results;
	};

	// Update List based on query
	self.updateList = function(data) {
		self.results(self.filterLocations());
		self.clearMarkers();
		self.updateMarkers(self.filterLocations());
	};

	// Clear Markers
	self.clearMarkers = function() {
		self.markers().forEach(function (marker, i) {
		    marker.setMap(null);
		});
		self.markers.removeAll();
	};

	// Update markers based on query
	self.updateMarkers = function(filterLocations) {
		filterLocations.forEach(function (location) {
			location.marker = new google.maps.Marker({
		        map: self.map,
		        position: location.coordinates,
		        animation: null
		    });

		    location.marker.addListener('click', function() {
	    		self.selectedLocation(location);
	    	});

		   	self.markers().push(location.marker);

		});
	};

	self.selectedLocation = function(location) {

		// Show the the current Info Window
		self.showPlaceInfo(location);

		// Position the current Info Window to the center of the map
		self.map.setCenter(location.marker.getPosition());

		// Animate the marker of the selected location
		self.animate(location.marker);

	};

	self.showPlaceInfo = function(location) {

		// Close the last window
		if (self.currentInfoWindow !== null) {
		    self.currentInfoWindow.close();
		}

		// Set the content of the location's Info Window
		location.infoWindow = new google.maps.InfoWindow({
			content: self.getHTML(location)
		});

		// Set the content of the location's Info Window to the current Info Window
		self.currentInfoWindow = location.infoWindow;

		// Open the current Info Window
		self.currentInfoWindow.open(self.map, location.marker);

	};

	self.getHTML = function(location) {

		var template = '<h1>$name</h1>$wiki';

		var wikiTemplate = '$img' + '<p>' + '$wiki' + '</p>';

		var wiki = '';

		if (location.wiki !== undefined) {
			wiki = wikiTemplate.replace('$wiki', "<h5>Wikipedia: </h5>" + location.wiki).replace('$img', 'Failed to load image');
			if (location.img !== undefined) {
				wiki = wikiTemplate.replace('$wiki', "<h5>Wikipedia: </h5>" + location.wiki).replace('$img', location.img);
			}
		} else {
			self.getWikiInfo(location);
		}

		var html = template.replace('$name', location.name).replace('$wiki', wiki);

		return html;
	};

	self.getWikiInfo = function(location) {

		// Wikipedia Information
		var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' +
			location.name +
			'&format=json';

		// Ajax Call
		$.ajax({
		    url: wikiUrl,
		    dataType: 'jsonp',
		    success: function(response) {
		    	if (response[2][0] !== undefined) {
			    	location.wiki = response[2][0];
			    	location.infoWindow.setContent(self.getHTML(location));
		    	}
		    },
		    timeout: 10000,
		    error: function() {
		    	if (self.apiSuccessful !== false) {
		    		alert("Wikipedia API Failed to load");
		    		self.apiSuccessful = false;
		    	}
		    }
		});

		// Wikipedia Thumbnail
		$.getJSON("http://en.wikipedia.org/w/api.php?action=query&format=json&callback=?", {
			titles: location.name,
			prop: "pageimages",
			pithumbsize: 150
		},
		function(data) {
			var source = "";
			var img = "";
			var imageUrl = GetAttributeValue(data.query.pages);
			if (imageUrl === "") {
				img = "No Image Found";
				location.img = img;
			} else {
				img = "<img class='icon' src=\"" + imageUrl + "\">";
				location.img = img;
			}
		}
		);

		function GetAttributeValue(data) {
			var urli = "";
			for (var key in data) {
				if (data[key].thumbnail !== undefined) {
					if (data[key].thumbnail.source !== undefined) {
						urli = data[key].thumbnail.source;
						break;
					}
				}
			}
			return urli;
		}

	};

	// Bounce the marker of the selected item
	self.animate = function(marker) {
		if (marker.getAnimation() !== null) {
		  marker.setAnimation(null);
		} else {
		  marker.setAnimation(google.maps.Animation.DROP);
		}
	};


	// Initialize the Map
	self.initMap = function() {
		self.map = new google.maps.Map(document.getElementById('map'), {
			center: {lat:14.602316, lng: 120.973803},
			zoom: 12,
			mapTypeControl: false

		});
	};
}

// Model
var data = [
    {
        name: "University of Santo Tomas",
        coordinates: {
            lat: 14.608674,
            lng: 120.991006
        }
	},
	{
        name: "De La Salle University",
        coordinates: {
            lat: 14.564869,
            lng: 120.993893
        }
	},
	{
        name: "Ateneo de Manila University",
        coordinates: {
            lat: 14.639749,
            lng: 121.078216
        }
	},
	{
        name: "University of the Philippines Diliman",
        coordinates: {
            lat: 14.660244,
            lng: 121.070220
        }
	},
	{
        name: "University of the East",
        coordinates: {
            lat: 14.601791,
            lng: 120.988843
        }
	},
	{
        name: "Adamson University",
        coordinates: {
            lat: 14.586954,
            lng: 120.985695
        }
	},
	{
        name: "Mapúa Institute of Technology",
        coordinates: {
            lat: 14.590679,
            lng: 120.978121
        }
	},
	{
        name: "Technological University of the Philippines",
        coordinates: {
            lat: 14.587618,
            lng: 120.984714
        }
	},
	{
        name: "Polytechnic University of The Philippines",
        coordinates: {
            lat: 14.599329,
            lng: 121.011396
        }
	},
	{
        name: "Centro Escolar University",
        coordinates: {
            lat: 14.599329,
            lng: 121.011396
        }
	},
	{
        name: "University of Asia and the Pacific",
        coordinates: {
            lat: 14.580406,
            lng: 121.060871
        }
	},
	{
        name: "Far Eastern University",
        coordinates: {
            lat: 14.599632,
            lng: 120.991401
        }
	}
];

// Google Error
function googleError() {
	alert("Failed to load Google Maps API");
}

var viewModel;

function initialize() {

	viewModel = new ViewModel();

	viewModel.initMap();
	viewModel.updateList();

	// Activate Knockout
	ko.applyBindings(viewModel, document.getElementById("list"));
}
