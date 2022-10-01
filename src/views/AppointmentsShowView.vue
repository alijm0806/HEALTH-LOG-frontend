<script>

import axios from "axios";
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


export default {
  data: function () {
    return {
      appointment: [],
    };
  },
  mounted: function () {
    this.makeMap();

  },
  created: function () {
    this.showAppointment();
  },
  methods: {

    showAppointment: function (appointment) {
      axios.get("/appointments/" + this.$route.params.id + ".json").then((response) => {
        this.appointment = response.data;
        // console.log(this.lists);
      })
    },
    makeMap: function () {
      console.log('making map...')
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
      const map1 = new mapboxgl.Map({
        container: 'map1',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.appointment.lon, this.appointment.lat],
        zoom: 13
      });
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        marker: {
          color: 'orange'
        },
        mapboxgl: mapboxgl
      });

      // Create a default Marker and add it to the map.
      const marker1 = new mapboxgl.Marker()
        .setLngLat([this.appointment.lon, this.appointment.lat])
        .addTo(map1);
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

  </div>
  <div>
    <div id='map1' style='width: 1100px; height: 800px; position:absolute; top:0'></div>
    <div id="geocoder" class="geocoder"></div>
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

#map1 {
  position: flex;
  align-items: center;
  top: 0;
  bottom: 0;
  width: 100%;
  margin-top: 75px;
}
</style>