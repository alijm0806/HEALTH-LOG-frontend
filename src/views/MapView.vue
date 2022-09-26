
<script>

import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default {
  data: function () {
    return {
      address: [-97.5569, 30.3408],
      newAddress: ""
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
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v11',

        center: this.address,
        zoom: 13
      });

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        marker: {
          color: 'orange'
        },
        mapboxgl: mapboxgl
      });

      map.addControl(geocoder);
    }
  },


}
</script>

<template>
  <div>
    <form v-on:submit.prevent="submit()">
      <input type="text" v-model="newAddress">

      <p><button class="btn btn-success" type="submit" value="Submit">Submit</button></p>
    </form>
  </div>
  <div>

    <div id='map' style='width: 1250px; height: 1400px;'></div>
  </div>
</template>

<style>
.geocoder-dropdown-item {
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
}
</style>