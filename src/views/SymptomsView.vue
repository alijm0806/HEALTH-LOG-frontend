<script setup>

import { ref } from 'vue';
const isHidden = ref(localStorage.getItem("isHidden") === "true");
localStorage.setItem("isHidden", isHidden.value)


</script >
  
<script>
import axios from "axios";


export default {
  data: function () {
    return {
      lists_of_vitamins: [],
      vitamins: [],
      searchTerm: "",
      lowerSearchTerm: "",
      newList: {},
      isHidden: false,
      AddToList: "Add to List",
      vitamin_ids: [],
      list_of_vitamin: [],
      errors: [],
      dismissSecs: 5,
      dismissCountDown: 0
    };
  },
  watch: {
    isHidden() {
      localStorage.setItem('isHidden', JSON.stringify(this.isHidden))
    }
  }
  ,
  mounted: function () {
    this.indexVitamins();
    this.indexList();
  },
  methods: {
    myComparator(a, b) {
      return parseInt(a.id, 10) - parseInt(b.id, 10);
    },
    indexVitamins: function () {
      axios.get("/vitamins.json").then((response) => {
        console.log("vitamins index", response);
        this.vitamins = response.data;
        this.vitamins.sort(this.myComparator);
      });
    },
    filterVitamins: function () {
      return this.vitamins.filter(vitamin => {
        var lowerSearchTerm = this.searchTerm.toLowerCase();
        var lowerVitaminDeficiency = vitamin.deficiency.toLowerCase();
        return lowerVitaminDeficiency.includes(this.searchTerm);
      })
    },
    indexList: function () {
      axios.get("/lists_of_vitamins.json").then((response) => {
        console.log("list index", response);
        this.lists_of_vitamins = response.data;
        console.log(this.lists_of_vitamins);

        for (var i = 0; i < this.lists_of_vitamins.length; i++) {
          this.vitamin_ids.push(this.lists_of_vitamins[i].vitamin_id)

        }
        console.log(this.vitamin_ids)
      });

    },
    addLists: function (vitamin) {
      this.newList.vitamin_id = vitamin.id
      console.log(this.newList)

      axios.post("/lists_of_vitamins.json", this.newList).then((response) => {
        console.log("lists_of_vitamins index", response);
        this.lists_of_vitamins.push(response.data);
        var alertList = document.querySelectorAll('.alert')
        alertList.forEach(function (alert) {
          new bootstrap.Alert(alert)
        })
      });

    },
    reloadPage() {
      window.location.reload();
    },
  }
};

</script> 
<template>

  <div class="vitamins-recommendations">

    <h1 class="main-title">SYMPTOMS</h1>
    <div class="recommendations">
      <p>Recommendations :</p>
      <div class="search-box" @submit.prevent="searchVitamin">
        <input class="search-txt" type="text" v-model="searchTerm" placeholder="Type Symptoms to Search" />
        <a class="search-btn" @click="searchVitamin">
          <i class="fa fa-search"></i>
        </a>
      </div>
    </div>

    <div>
      <div>
        <div class="card-mb-3" v-for="vitamin in filterVitamins()" v-bind:key="vitamin.id">
          <ul>
            <li v-for="error in errors" v-bind:key="error" id="errors">{{ error }}</li>
          </ul>
          <div class="row ">
            <div class=" col-sm-4">
              <img v-bind:src="vitamin.image_url" class="img-responsive" alt="" />
            </div>
            <div class=" col-sm-8">
              <h2 class="card-title">{{ vitamin.name }}</h2>
              <p class="card-text">
              <div>
                <h5 id="h5"><b>Deficiency Symptoms: <br></b>{{ vitamin.deficiency }}</h5>
              </div>
              <br>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
  
<style>
.recommendations {
  width: 100%;
  height: 100px
}

.recommendations p {
  font-size: 35px;
  color: rgb(0, 85, 255);
}

#h5 {
  flex: 1;
  font-size: 25px;

  letter-spacing: 1px;
  padding: 10px;
  margin-top: 10px;
  height: 30px;

}
</style>