<template>
  <div class="Home">

    <!-- Start Header -->
    <h1 class="main-title">HEALTH LOG</h1>
    <!-- End Header -->

    <!-- Start Landing -->
    <div class="landing">
      <div class="container">
        <div class="text">
          <h1 style="color: #ff4583e7;">Welcome To Health Log</h1>
          <p class="home-p">Health Log® is the easiest way to track your vitamins intakes, to monitor your doctor's
            appointments in order to improve your wellbeing.

          </p>
        </div>
        <div class="image mt-3">
          <img src="../assets/Health-Medical-Logo.png" alt="" />
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

export default {


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
  background-color: rgb(236, 236, 236, 0.5);
  z-index: -1;
  transform: skewY(-6deg);
  transform-origin: top left;
}

.landing .container {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  padding-bottom: 400px;
}

.landing .text {
  flex: 1;

}

.landing .text h1 {
  font-size: 45px;
  margin: 0;
  letter-spacing: -2px;
}

.landing .text p {
  font-size: 40px;
  line-height: 1.7;
  margin: 5px 5px 0;
  color: #666;
}

.landing .image {
  height: 600px;
}

.landing .image img {
  width: 100%;
  max-width: 90%;
  height: 500;
  max-height: 95%;
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

.home-p {
  font-size: larger;
  color: black;

}
</style>