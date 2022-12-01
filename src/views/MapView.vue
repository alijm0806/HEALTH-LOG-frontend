<script>

import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default {
  data: function () {
    return {
      trackUserLocation: {}
    };
  },
  mounted: function () {
    this.makeMap();
  },
  methods: {
    submit: function () {
      this.address = this.newAddress;
    },
    makeMap: function () {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-99, 42],
        zoom: 3.5,
      });
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        marker: {
          color: 'orange'
        },
        mapboxgl: mapboxgl
      });
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          // When active the map will receive updates to the device's location as it changes.
          trackUserLocation: true,
          // Draw an arrow next to the location dot to indicate which direction the device is heading.
          showUserHeading: true
        })
      );
      console.log("this.trackUserLocation")
      document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    }
  },
}
</script>

<template>
  <div>
    <div id='map'></div>
    <div id="geocoder" class="geocoder"></div>
  </div>
</template>

<style>
.geocoder {
  position: absolute;
  z-index: 1;
  width: 50%;
  left: 50%;
  margin-left: -25%;
  top: 10px;
}

.mapboxgl-ctrl-geocoder {
  min-width: 90%;
}

#map {
  position: flex;
  align-items: center;
  top: 0;
  bottom: 0;
  width: 100%;
  margin-top: 75px;
  width: 100%;
  height: 90vh;
}
</style>