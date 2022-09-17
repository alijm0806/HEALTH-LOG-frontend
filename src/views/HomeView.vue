<template>
  <div class="Home">
    <h1 class="main-title">HEALTH LOG</h1>


    <!-- Start Landing -->
    <div class="landing">
      <div class="landing-container">
        <div class="text">
          <h1 style="color: #ff4583e7;">Welcome To Health Log</h1>
          <p></p>
        </div>
      </div>
    </div>
    <a href="/vitamins" class="go-down">
      <span class="material-symbols-outlined">
        keyboard_double_arrow_down
      </span>
    </a>

    <!-- End Landing -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
<style>
.Home {
  max-height: 100vh;
  overflow: hidden;
  scroll-behavior: unset;
}

.landing {
  position: relative;
}

.landing::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.landing-container {
  min-height: calc(100vh - 150px);
}


.material-symbols-outlined {
  position: absolute;
  bottom: 150px;
  width: 75px;
  height: 100px;
  left: 50%;
  size: 200%;
  transition: var(--main-transition);
  color: #4ade80;
  font-size: 700%;

}


.material-symbols-outlined:hover {
  color: #ff4583e7;
  position: absolute;



}
</style>