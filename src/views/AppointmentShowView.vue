<script>

import axios from "axios";
import mapboxgl from 'mapbox-gl'



export default {
  data: function () {
    return {
      appointment: []
    };
  },
  created: function () {
    this.showAppointment()
  },
  mounted: function () {
    this.makeMap()
  },
  methods: {

    showAppointment: function (appointment) {
      axios.get("/appointments/" + this.$route.params.id + ".json").then((response) => {
        this.appointment = response.data;
        console.log(this.appointment);
      })
    },
    makeMap: function () {
      console.log('making map...')
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
      const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.appointment.lon, this.appointment.lat],
        zoom: 13
      });

      // Create a default Marker and add it to the map.
      const marker1 = new mapboxgl.Marker()
        .setLngLat([this.appointment.lon, this.appointment.lat])
        .addTo(map);
    }
  }
}
</script>
    
<template>

  <div class="appointment-show">

    <div class="container mt-3">
      <div class="row" id="show-row">
        <div class="col-lg-6 " id="edit-col">
          <div class="card my-2 list-group-item-success shadow-lg">
            <div class="card-body ">
              <div class="edit-row ">
                <ul class="list-group">
                  <li class="list-group-item">Address: <span class="fw-bold">{{this.appointment.address}}</span>
                  </li>
                  <li class="list-group-item">Speciality:<span class="fw-bold">
                      {{this.appointment.doctor.speciality}}</span>
                  </li>
                  <li class="list-group-item">
                    Phone Number: <span class="fw-bold">{{this.appointment.phone_number}}</span>
                  </li>
                  <li class="list-group-item">
                    Date: <span class="fw-bold">{{this.appointment.date}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <br>
          <router-link to="/Appointments">
            <button class="btn btn-info mt-3" id="edit-btn">
              GO BACK </button>
          </router-link>
        </div>

        <div class="col-lg-6 ">
          <img v-bind:src="appointment.doctor.image_url" class="show-img" alt="show-img">
        </div>

      </div>

    </div>
    <div>
      <div id="map" class="mapboxgl-map" style="width: 1100px; height: 800px; position: absolute; top: 0px;">
        <div class="mapboxgl-canary" style="visibility: hidden;"></div>
        <div class="mapboxgl-canvas-container mapboxgl-interactive mapboxgl-touch-drag-pan mapboxgl-touch-zoom-rotate">
          <canvas class="mapboxgl-canvas" tabindex="0" aria-label="Map" role="region" width="825" height="600"
            style="width: 1100px; height: 800px;"></canvas>
          <div aria-label="Map marker" class="mapboxgl-marker mapboxgl-marker-anchor-center"
            style="transform: translate(550px, 400px) translate(-50%, -50%) translate(0px, -14px);"><svg display="block"
              height="41px" width="27px" viewBox="0 0 27 41">
              <defs>
                <radialGradient id="shadowGradient">
                  <stop offset="10%" stop-opacity="0.4"></stop>
                  <stop offset="100%" stop-opacity="0.05"></stop>
                </radialGradient>
              </defs>
              <ellipse cx="13.5" cy="34.8" rx="10.5" ry="5.25" fill="url(#shadowGradient)"></ellipse>
              <path fill="#3FB1CE"
                d="M27,13.5C27,19.07 20.25,27 14.75,34.5C14.02,35.5 12.98,35.5 12.25,34.5C6.75,27 0,19.22 0,13.5C0,6.04 6.04,0 13.5,0C20.96,0 27,6.04 27,13.5Z">
              </path>
              <path opacity="0.25"
                d="M13.5,0C6.04,0 0,6.04 0,13.5C0,19.22 6.75,27 12.25,34.5C13,35.52 14.02,35.5 14.75,34.5C20.25,27 27,19.07 27,13.5C27,6.04 20.96,0 13.5,0ZM13.5,1C20.42,1 26,6.58 26,13.5C26,15.9 24.5,19.18 22.22,22.74C19.95,26.3 16.71,30.14 13.94,33.91C13.74,34.18 13.61,34.32 13.5,34.44C13.39,34.32 13.26,34.18 13.06,33.91C10.28,30.13 7.41,26.31 5.02,22.77C2.62,19.23 1,15.95 1,13.5C1,6.58 6.58,1 13.5,1Z">
              </path>
              <circle fill="white" cx="13.5" cy="13.5" r="5.5"></circle>
            </svg></div>
        </div>
        <div class="mapboxgl-control-container">
          <div class="mapboxgl-ctrl-top-left"></div>
          <div class="mapboxgl-ctrl-top-right"></div>
          <div class="mapboxgl-ctrl-bottom-left">
            <div class="mapboxgl-ctrl" style="display: block;"><a class="mapboxgl-ctrl-logo" target="_blank"
                rel="noopener nofollow" href="https://www.mapbox.com/" aria-label="Mapbox logo"></a></div>
          </div>
          <div class="mapboxgl-ctrl-bottom-right">
            <div class="mapboxgl-ctrl mapboxgl-ctrl-attrib"><button class="mapboxgl-ctrl-attrib-button" type="button"
                aria-label="Toggle attribution"><span class="mapboxgl-ctrl-icon" aria-hidden="true"
                  title="Toggle attribution"></span></button>
              <div class="mapboxgl-ctrl-attrib-inner" role="list"><a href="https://www.mapbox.com/about/maps/"
                  target="_blank" title="Mapbox" aria-label="Mapbox" role="listitem">© Mapbox</a> <a
                  href="https://www.openstreetmap.org/about/" target="_blank" title="OpenStreetMap"
                  aria-label="OpenStreetMap" role="listitem">© OpenStreetMap</a> <a class="mapbox-improve-map"
                  href="https://apps.mapbox.com/feedback/?owner=mapbox&amp;id=streets-v11&amp;access_token=pk.eyJ1IjoiYnJpYW5yZ3J2ZiIsImEiOiJjbDdxb3VwaTEwN2hjM3dwYnNhdzJjNXQxIn0.wU51MSGzq6IMQOAzeLgjmA#/-96.79686/32.77627/13"
                  target="_blank" aria-label="Map feedback" role="listitem" rel="noopener nofollow">Improve this map</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
    
<style>
#show-row {
  height: 130%;
  align-items: center;


}

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