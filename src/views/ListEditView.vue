<script>
import axios from "axios";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/material_blue.css';

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
      currentLists_of_vitamin: {}
    };
  },
  components: {
    flatPickr
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
        console.log(this.lists_of_vitamin);

      })
    },
    updateList: function (currentLists_of_vitamin) {

      console.log('updating list...')
      axios.patch("/lists_of_vitamins/" + this.lists_of_vitamin.id + ".json", this.currentLists_of_vitamin).then(response => {
        console.log(response.data);
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
      <div class="row">
        <div class="col-md-6">
          <div class="card my-2 list-group-item-success shadow-lg">
            <div class="card-body">
              <div class="row ">

                <ul class="list-group">
                  <li class="list-group-item">Name: <span class="fw-bold">{{ lists_of_vitamin.vitamin.name}}</span>
                  </li>
                  <li class="list-group-item">Quantity: <label class="mr-sm-2 sr-only"
                      for="inlineFormCustomSelect"></label>
                    <select class="custom-select mr-sm-2" id="inlineFormCustomSelect"
                      v-model="currentLists_of_vitamin.quantity">
                      <option selected>Choose...</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                      <option value="4">Four</option>
                      <option value="5">Five</option>

                    </select>
                  </li>
                  <li class="list-group-item">Intakes: <span class="fw-bold">{{ list.id
                  }}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-6 flex-column justify-content-center">
          <img v-bind:src="lists_of_vitamin.vitamin.images" class="show-img" alt="show-img">
        </div>

        <button class="btn btn-success" id="edit-btn" v-on:click="updateList(currentLists_of_vitamin)"
          v-bind="lists_of_vitamin.id">EDIT</button>

      </div>
    </div>


  </div>
</template>
    
<style>
#edit-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 20%;
  height: 45px;
  font-size: larger;
  letter-spacing: 0.5rem;
}

select {
  cursor: pointer;
}
</style>