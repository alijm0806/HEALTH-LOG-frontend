<script>
import axios from "axios";

export default {
  data: function () {
    return {
      date: new Date(),
      lists_of_vitamin: [],
      config: {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: false
      },
      lists_of_vitamins: [],
      list: [],
      lists: [],
      checkbox: true,
      currentLists_of_vitamin: {},
    };
  },
  watch: {
    lists() {
      localStorage.setItem('lists', JSON.stringify(this.lists))
    }
  },
  created: function () {
    this.showList();

  },
  methods: {

    showList: function () {
      axios.get("/lists_of_vitamins/" + this.$route.params.id + ".json").then((response) => {
        this.lists_of_vitamin = response.data;
      })
    },
    updateList: function (currentLists_of_vitamin) {
      currentLists_of_vitamin.intake_quantity_left = currentLists_of_vitamin.quantity
      axios.patch("/lists_of_vitamins/" + this.lists_of_vitamin.id + ".json", this.currentLists_of_vitamin).then(response => {
        this.$router.push("/vitamins/mylist");
      })
    },
  }
}
</script>
    
<template>

  <div class="list-show">
    <h1 class="main-title">{{lists_of_vitamin.vitamin.name}}</h1>
    <div class="container mt-3">
      <div class="row" id="edit-row">
        <div class="col-lg-6 ">
          <div class="card my-2 list-group-item-success shadow-lg">
            <div class="card-body ">
              <div class="row ">
                <ul class="list-group">
                  <p class="edit-p">Select your daily intakes:</p>
                  Vitamin Name: <li class="list-group-item"><span class="fw-bold">{{
                  lists_of_vitamin.vitamin.name}}</span>
                  </li>
                  Daily Quantity: <li class="list-group-item"><label class="mr-sm-2 sr-only"
                      for="inlineFormCustomSelect"></label>
                    <select class="form-control" v-model="currentLists_of_vitamin.quantity">
                      <option disabled selected value> -- select an option --</option>
                      <option value="1" selected>One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                      <option value="4">Four</option>
                      <option value="5">Five</option>
                    </select>
                  </li>

                </ul>
              </div>
            </div>
          </div>
          <br>
          <div class="edit-btn">
            <button class="btn btn-success" v-on:click="updateList(currentLists_of_vitamin)"
              v-bind="lists_of_vitamin.id">SAVE</button>
          </div>
          <router-link to="/vitamins/mylist">
            <button class="btn btn-info mt-3" id="edit-btn">
              GO BACK </button>
          </router-link>
        </div>

        <div class="col-lg-6 ">
          <img v-bind:src="lists_of_vitamin.vitamin.images" class="show-img" alt="show-img">
        </div>

      </div>
    </div>
  </div>
</template>
    
<style>
.show-img {
  /* display: grid; */
  width: 70%;
  max-width: 70%;
  object-fit: cover;
  height: 60%;
  max-height: 60%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  margin: auto
}

#edit-row {
  height: 50%;
  align-items: center;


}


select {
  cursor: pointer;
}

.edit-p {
  font-size: larger;
  font-weight: bold;
  color: blueviolet;
  font-style: italic;
}
</style>