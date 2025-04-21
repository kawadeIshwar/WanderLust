// This file contains the code to initialize the map using Mapbox GL JS
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: coordinates,
    zoom: 9
});
console.log(coordinates);

const marker = new mapboxgl.Marker()
    .setLngLat(coordinates)
    .addTo(map);
