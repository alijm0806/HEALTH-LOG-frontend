<script>

import axios from "axios";
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default {

  data: function () {
    setTimeout(this.makeMap, 1000);
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
    },
    showAppointment: function (appointment) {
      axios.get("/appointments/" + this.$route.params.id + ".json").then((response) => {
        this.appointment = response.data;
        console.log(this.appointment);
      })
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
    <div id='map' style='width: 1100px; height: 700px; position:absolute; top:0'></div>
    <div id="geocoder" class="geocoder"></div>
  </div>
</template>
    
<style>
#show-row {
  height: 80%;
  align-items: center;
  margin-top: 40px;
  scroll-behavior: auto;
  margin-top: 500px;
}
</style>