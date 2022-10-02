
<script>

import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default {
  data: function () {
    return {

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
      console.log('making map...')
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-97.5569, 30.3408],
        zoom: 13,
      });
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        marker: {
          color: 'orange'
        },
        mapboxgl: mapboxgl
      });
      document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    }
  },
}
</script>

<template>
  <div>

    <div id='map' style='width: 1050px; height: 90vh;'></div>
    <div id="geocoder" class="geocoder"></div>
  </div>
</template>

<style>
/* .geocoder-dropdown-item {
  padding: 5px;
}

.geocoder-dropdown-icon {
  margin-right: 10px;
}

.geocoder-dropdown-text {
  color: #5a3fc0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: larger;
}

.mapboxgl-ctrl-geocoder--input {
  height: 50px
} */

.geocoder {
  position: absolute;
  z-index: 1;
  width: 50%;
  left: 50%;
  margin-left: -25%;
  top: 10px;
}

.mapboxgl-ctrl-geocoder {
  min-width: 100%;
}

#map {
  position: flex;
  align-items: center;
  top: 0;
  bottom: 0;
  width: 100%;
  margin-top: 75px;
}
</style>