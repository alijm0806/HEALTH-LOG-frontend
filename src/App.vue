
<script setup>
import { ref } from 'vue';
const is_expanded = ref(localStorage.getItem("is_expanded") === "false");
const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value
  localStorage.setItem("is_expanded", is_expanded.value)
}
localStorage.setItem("is_expanded", is_expanded.value)
</script >

<script>
import 'mapbox-gl/dist/mapbox-gl.css'
export default {

  data: function () {
    return {
      isLoggedIn: !!localStorage.jwt
    }
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt
    }
  },
}

</script>

<template>
  <div class="app">

    <aside :class="`${is_expanded ? 'is_expanded' : ''}`">
      <div class="logo">
        <img src="./assets/Health-Medical-Logo.png" alt="Vue" />
      </div>
      <div class="menu-toggle-wrap">
        <button class="menu-toggle" v-on:click="ToggleMenu">
          <span class="material-icons"> keyboard_double_arrow_right</span>
        </button>
      </div>

      <div class="menu">
        <router-link to="/" v-if="!isLoggedIn" class="button">
          <span v-if="!isLoggedIn" class="material-icons">
            login
          </span>
          <span v-if="!isLoggedIn" class="text">Login</span>
        </router-link>

        <router-link to="/home" v-if="isLoggedIn" class="button">
          <span v-if="isLoggedIn" class="material-icons">home</span>
          <span v-if="isLoggedIn" class="text">Home</span>

        </router-link>

        <router-link to="/vitamins" v-if="isLoggedIn" class="button">
          <span v-if="isLoggedIn" class="material-icons">description</span>
          <span v-if="isLoggedIn" class="text">Vitamins</span>
        </router-link>

        <router-link to="/vitamins/symptoms" v-if="isLoggedIn" class="button">
          <span v-if="isLoggedIn" class="material-icons">assistant</span>
          <span v-if="isLoggedIn" class="text">Symptoms</span>
        </router-link>

        <router-link to="/vitamins/mylist" v-if="isLoggedIn" class="button">
          <span v-if="isLoggedIn" class="material-icons">favorite</span>
          <span v-if="isLoggedIn" class="text">My List</span>
        </router-link>

        <router-link to="/Appointments" v-if="isLoggedIn" class="button">
          <span v-if="isLoggedIn" class="material-icons">app_registration</span>
          <span v-if="isLoggedIn" class="text">Appointments</span>
        </router-link>

        <router-link to="/charts" v-if="isLoggedIn" class="button">
          <span v-if="isLoggedIn" class="material-icons">pie_chart</span>
          <span v-if="isLoggedIn" class="text">Charts</span>
        </router-link>
        <router-link to="/map" v-if="isLoggedIn" class="button">
          <span v-if="isLoggedIn" class="material-icons">map</span>
          <span v-if="isLoggedIn" class="text">Map</span>
        </router-link>
        <router-link to="/contact" v-if="isLoggedIn" class="button">
          <span v-if="isLoggedIn" class="material-icons">email</span>
          <span v-if="isLoggedIn" class="text">Contact Us</span>
        </router-link>

      </div>
      <div class="flex"></div>
      <div class="menu">
        <router-link to="/Logout" class="button">
          <span v-if="isLoggedIn" class="material-icons">
            logout
          </span>
          <span v-if="isLoggedIn" class="text">Logout</span>
        </router-link>
        <!-- 
        <router-link to="/settings" class="button">
          <span class="material-icons">settings</span>
          <span class="text">Settings</span>
        </router-link> -->
      </div>
    </aside>
    <div class="container">
      <router-view />
    </div>
  </div>
</template >


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira sans', sans-serif;
}

:root {
  --primary: #4ade80;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}

.app {
  display: flex;
  flex: 1 1 0;
  max-width: 100%;
  background: rgba(0, 0, 0, 0.1)url("./assets/pexels-photo-3683074.png");
  background-size: cover;
  background-blend-mode: darken;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
}


aside {
  display: flex;
  flex-direction: column;
  background-color: var(--dark);
  color: var(--light);
  width: calc(2rem + 35px);
  min-width: calc(2rem + 30px);
  overflow: hidden;
  height: 100vh;
  padding: 1rem;
  transition: 0.2s ease-in-out;
  z-index: 99;
}



.menu-toggle {
  transition: 0.2s ease-in-out;
  margin: 0px -20px 0px 0px;

}


.is_expanded .menu-toggle {
  top: -3rem;
  transform: rotate(-180deg);
  margin: 0px -90px 0px 0px;
}

.is_expanded,
.menu-toggle {
  width: calc(2rem + 225px);
}

.menu-toggle-wrap {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  position: relative;
  top: 0;
  transition: 0.2s ease-in-out;

}

.menu-toggle {
  margin-left: 3rem;
}

menu.button {
  opacity: 1;
  margin-right: 1rem;
}

.logo {
  margin-bottom: 1rem;
  width: 2rem;
  max-height: 100%;
  max-width: 100%;
}

img {
  max-width: 2.8rem;
  max-height: 5rem;

}

.body {
  background: var(--light);
}


button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.menu {
  margin: 0 -1rem;
}

.button {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: 0.2s ease-in-out;
  padding: 0.5rem 1rem;
}



.text {
  color: white;
  transition: 0.2s ease-in-out;
  margin-left: 2px;
}

.text:hover {
  font-weight: bolder;
  color: rgb(121, 221, 131);
  transition: 0.2s ease-in-out;
}

.button:hover {
  background-color: rgb(93, 93, 55);
}


.is_expanded,
.button {
  margin-right: 1rem;
}

.is_expanded,
.material-icons {
  margin-right: 1rem;

}


.material-icons:hover {
  background-color: var(--dark-alt);
  background-color: lightgrey;
  transform: translateX(0.5rem);
}



.material-icons {

  font-size: 2rem;
  color: var(--primary);
  transition: 0.2s ease-in-out;
}

aside .menu .router-link-exact-active {
  background-color: var(--dark-alt);
  border-right: 5px solid var(--primary);
}

.button.router-link-exact-active:hover,
.button.router-link-exact-active:active {
  border-right: 5px solid var(--primary);
}

.flex {
  flex: 1 1 0;
}


footer {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  font-size: 0.875rem;
  color: var(--grey);
}

.is_expanded,
.text {
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

.container {
  position: sticky;
  overflow: scroll;
  height: 100vh;
  scroll-behavior: smooth;
  margin-top: 50px
}

::-webkit-scrollbar {
  width: 0px;
  background: transparent;
  /* make scrollbar transparent */
}


@media (max-width: 768px) {

  .container {
    position: absolute;
    z-index: 99;
  }
}

#errors {
  color: red
}
</style>
