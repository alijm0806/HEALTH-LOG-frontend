
<script setup>

import { ref } from 'vue';
const is_expanded = ref(localStorage.getItem("is_expanded") === "true");
const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value
  localStorage.setItem("is_expanded", is_expanded.value)
}
</script >

<script>
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
  }
}
</script>

<template>
  Am I logged in? {{ isLoggedIn }}

  <div class="app">

    <aside :class="`${is_expanded ? 'is_expanded' : ''}`">

      <div class="logo">
        <img src="./assets/logo.png" alt="Vue" />
      </div>

      <div class="menu-toggle-wrap">
        <button class="menu-toggle" v-on:click="ToggleMenu">
          <span class="material-icons"> keyboard_double_arrow_right</span>
        </button>
      </div>


      <h3></h3>
      <div class="menu">
        <router-link to="/vitamins" class="button">
          <span class="material-icons">home</span>
          <span class="text">Home</span>

        </router-link>
        <router-link to="/vitamins/mylist" class="button">
          <span class="material-icons">favorite</span>
          <span class="text">My List</span>
        </router-link>
        <router-link to="/about" class="button">
          <span class="material-icons">description</span>
          <span class="text">About</span>
        </router-link>
        <router-link to="/team" class="button">
          <span class="material-icons">group</span>
          <span class="text">Team</span>
        </router-link>
        <router-link to="/contact" class="button">
          <span class="material-icons">email</span>
          <span class="text">Contact</span>
        </router-link>


        <li class="material-icons">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            Authentication
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a v-if="!isLoggedIn" class="dropdown-item" href="/Signup">Signup</a></li>
            <li><a v-if="!isLoggedIn" class="dropdown-item" href="/">Login</a></li>
            <li><a v-if="isLoggedIn" class="dropdown-item" href="/Logout">Logout</a></li>
          </ul>
        </li>


      </div>

      <div class="flex"></div>

      <div class="menu">
        <router-link to="/settings" class="button">
          <span class="material-icons">settings</span>
          <span class="text">Settings</span>
        </router-link>
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
  padding: 2rem;
  max-width: 2500px;
  padding-left: 6rem;

}

aside {
  display: flex;
  flex-direction: column;
  background-color: var(--dark);
  color: var(--light);
  width: calc(2rem + 30px);
  min-width: calc(2rem + 30px);
  overflow: hidden;
  min-height: 100vh;
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
  max-height: min-content;
  max-width: 50%;
}

img {
  max-width: 2rem;

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


.router-link-exact-active:hover,
.router-link-exact-active:active {

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

h3,
.text {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}


.is_expanded,
.text {
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

media {
  position: absolute;
  z-index: 99;
}
</style>
