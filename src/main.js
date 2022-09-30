
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://visionary-brioche-5cb49f.netlify.app/";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}


createApp(App).use(router).mount('#app')
