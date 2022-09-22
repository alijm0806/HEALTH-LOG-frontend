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
    updateList: function () {

      this.lists_of_vitamin.quantity = 3

      console.log('updating list...')
      axios.patch(`/lists_of_vitamins/345.json`, this.lists_of_vitamin).then(response => {
        console.log(response.data);
        // this.$router.push(`/recipes/${this.recipe.id}`);
      })
    },

  }
}
</script>
  
<template>

  <div class="list-show">
    <h1 class="main-title">{{lists_of_vitamin.vitamin.name}}</h1>

    <div v-bind:key="list.id" :class="`${list.id % 2==0 ? 'odd-list' : 'even-list' }`">

      <div class="list-1">
        <label>
          <input type="checkbox" class="checkbox" v-on:click="updateList()" v-bind:key="lists_of_vitamin.quantity" />
        </label>
      </div>
      <div class="form-group">
        <label>time: </label>
        <div class="input-group">
          <flat-pickr v-model="date" :config="config" class="form-control">
          </flat-pickr>
        </div>
      </div>
      <div class="list-3">
        {{ lists_of_vitamin.vitamin.name }}
      </div>
      <div class="list-4">
        Quantity: {{ lists_of_vitamin.quantity }}
      </div>
      <div class="list-5">
        ID: {{ lists_of_vitamin.id }}
      </div>
    </div>


  </div>
</template>
  
<style>
.odd-list {
  display: flex;
  align-items: center;
  height: 90%;
  background-color: rgb(0, 188, 212, 0.7);
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  margin: 1rem 0;
}

.even-list {
  display: flex;
  align-items: center;
  height: 90%;
  background-color: rgba(238, 134, 8, 0.5);
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  margin: 1rem 0;
}

.list-1 {
  display: flex;
  align-items: center;
  background-color: #FFF;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  margin: 0.3rem 0.3rem;
  ;
  width: 5%
}

.form-group {
  display: flex;
  align-items: center;
  background-color: #FFF;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  margin: 0.3rem 0.3rem;
  ;
  width: 15%
}

.list-3 {
  display: flex;
  align-items: center;
  background-color: #FFF;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  margin: 0.3rem 0.3rem;
  ;
  width: 26.6%
}


.list-4 {
  display: flex;
  align-items: center;
  background-color: #FFF;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  margin: 0.3rem 0.3rem;
  width: 26.6%
}


.list-5 {
  display: flex;
  align-items: center;
  background-color: #FFF;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  margin: 0.3rem 0.3rem;
  width: 25%
}

.checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 2px 2px 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #3A82EE;
  box-shadow: 0px 0px 4px rgba(58, 130, 238, 0.75);
}

.checkbox::after {
  content: "";
  display: block;
  opacity: 0;
  width: 0px;
  height: 0px;
  background-color: #3A82EE;
  box-shadow: 0px 0px 4px rgba(58, 130, 238, 0.75);
  border-radius: 50%;
  transition: 0.2s ease-in-out;
}
</style>