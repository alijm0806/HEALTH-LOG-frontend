<script>
import axios from "axios";
export default {
  data: function () {
    return {
      lists_of_vitamins: [],

    };
  },
  created: function () {
    this.indexList();
  },
  methods: {
    indexList: function () {
      axios.get("/lists_of_vitamins.json").then((response) => {
        console.log("list index", response);
        this.lists_of_vitamins = response.data;
        console.log(this.lists_of_vitamins);

      });
    },
  },
};
</script>
    
<template>

  <div class="list-index">
    <h1>My list</h1>
    <br>
    <br>
    <div v-for="list_of_vitamin in lists_of_vitamins" v-bind:key="list_of_vitamin.id">
      <h2>{{ list_of_vitamin }}</h2>
      <hr>
      <hr>
    </div>
  </div>
</template>