// TODO: add your own access token
mapboxgl.accessToken = 'pk.eyJ1IjoiYmhhdmltcCIsImEiOiJjbDBzdG1tdHkwZ3phM2JvMmk0cGhjeTBzIn0.CSrwKYPoMRwvMvhgAZBsnA';

// This is the map instance
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/navigation-night-v1',
  center: [-71.104081, 42.365554],
  zoom: 14,
});
// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// TODO: add a marker to the map at the first coordinates in the array busStops. The marker variable should be named "marker"
const marker = new mapboxgl.Marker({
    color: "#f14e4e"
})
.setLngLat([-71.104081, 42.365554])
.addTo(map);

async function run(){
    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);

	// timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();

// counter here represents the index of the current bus stop
let counter = 0;
function move() {
  // TODO: move the marker on the map every 1000ms. Use the function marker.setLngLat() to update the marker coordinates
  // Use counter to access bus stops in the array busStops
  // Make sure you call move() after you increment the counter.

  setTimeout(() => {
    if(counter >= busStops.length) return;
    marker.setLngLat(busStops[counter]);
    console.log(counter);
    counter++;
    move();
  }, 1000);
}

// Do not edit code past this point
if (typeof module !== 'undefined') {
  module.exports = { move };
}
