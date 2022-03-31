// TODO: add your own access token
mapboxgl.accessToken = 'pk.eyJ1IjoiYmhhdmltcCIsImEiOiJjbDBzdG1tdHkwZ3phM2JvMmk0cGhjeTBzIn0.CSrwKYPoMRwvMvhgAZBsnA';
const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	
// This is the map instance
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/navigation-night-v1',
  center: [-71.104081, 42.365554],
  zoom: 14,
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

const geojson = {
  type: 'BusCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-71.104081, 42.365554]
      },
      properties: {
        title: 'Mapbox',
        description: 'Center'
      }
    }
  ]
};

// add Center to map
for (const feature of geojson.features) {
  // create a HTML element for each feature
  const center = document.createElement('div');
  center.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(center).setLngLat(feature.geometry.coordinates).addTo(map);
}


// TODO: add a marker to the map at the center coordinates"
const center = new mapboxgl.Marker({
    id: 'center',
    color: "#f14e4e"
})
  .setLngLat([-71.104081, 42.365554])
  .addTo(map);

let busMarkers = [];


// Request bus data from MBTA
async function getBusLocations(){
	let response = await fetch(url);
	let json     = await response.json();
  // console.log(json.data);
  return json.data;
}


async function run(){
    // get bus data    
	let locations = await getBusLocations();
  let numBuses = locations.length;

  if(busMarkers!==null){
    for (var j = busMarkers.length - 1; j >= 0; j--) {
      busMarkers[j].remove();
    }
    console.log(busMarkers.length);
  }
  

  locations.forEach((bus, index) => {
    let busLabel = bus.attributes.label;
    let busLat = bus.attributes.latitude;
    let busLong = bus.attributes.longitude;
    // console.log('Label: ' + busLabel + ' Lat: ' + busLat + ' Long: ' + busLong);
    
    //{
    //   color: "#13A1E5"
    // }

    var marker = new mapboxgl.Marker()
      .setLngLat([busLong, busLat])
      .addTo(map);

      busMarkers.push(marker);
    
  });
  console.log(busMarkers);
    
	// timer
	setTimeout(run, 2000);
}





// counter here represents the index of the current bus stop
// let counter = 0;
// function move() {
//   // TODO: move the marker on the map every 1000ms. Use the function marker.setLngLat() to update the marker coordinates
//   // Use counter to access bus stops in the array busStops
//   // Make sure you call move() after you increment the counter.

//   setTimeout(() => {
//     if(counter >= busStops.length) return;
//     marker.setLngLat(busStops[counter]);
//     console.log(counter);
//     counter++;
//     move();
//   }, 1000);
// }

// Do not edit code past this point
if (typeof module !== 'undefined') {
  module.exports = { move };
}
