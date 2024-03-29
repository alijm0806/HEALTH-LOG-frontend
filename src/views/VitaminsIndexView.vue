<script setup>
import { ref } from 'vue';
const isHidden = ref(localStorage.getItem("isHidden") === "true");
localStorage.setItem("isHidden", isHidden.value)
</script >

<script>
import axios from "axios";
import Swal from 'sweetalert2'

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
    };
  },
  watch: {
    isHidden() {
      localStorage.setItem('isHidden', JSON.stringify(this.isHidden))
    }
  },

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
        this.vitamins = response.data;
        this.vitamins.sort(this.myComparator);
      });
    },
    filterVitamins: function () {
      return this.vitamins.filter(vitamin => {
        var lowerSearchTerm = this.searchTerm.toLowerCase();
        var lowerVitaminName = vitamin.name.toLowerCase();
        return lowerVitaminName.includes(this.searchTerm);
      })
    },
    indexList: function () {
      axios.get("/lists_of_vitamins.json").then((response) => {
        this.lists_of_vitamins = response.data;
        this.vitamin_ids = [];
        for (var i = 0; i < this.lists_of_vitamins.length; i++) {
          this.vitamin_ids.push(this.lists_of_vitamins[i].vitamin_id)
        }
      });
    },
    addLists: function (vitamin) {
      this.newList.vitamin_id = vitamin.id
      axios.post("/lists_of_vitamins.json", this.newList).then((response) => {
        this.lists_of_vitamins.push(response.data);
        Swal.fire('Added', 'Vitamin successfully added to your list.', 'success');
        setTimeout(this.indexList, 500);
        setTimeout(this.indexVitamins, 500);

      });
    },
    removeList: function (vitamin) {
      const list_id = this.lists_of_vitamins.filter(listVit => listVit.vitamin_id === vitamin.id)

      axios.delete("/lists_of_vitamins/" + list_id[0].id + ".json").then((response) => {
        Swal.fire('Removed', 'Vitamin successfully removed from your list.', 'error');
        setTimeout(this.indexList, 500);
        setTimeout(this.indexVitamins, 500);
      });
    },
  }
};

</script> 
<template>
  <div class="vitamins-index">
    <!-- Title Start -->
    <h1 class="main-title">VITAMINS</h1>
    <!-- Title End -->

    <!-- Search Start -->
    <div class="recommendations">
      <div class="search-box" @submit.prevent="searchVitamin">
        <input class="search-txt" type="text" v-model="searchTerm" placeholder="Type a Vitamin Name" />
        <a class="search-btn" @click="searchVitamin">
          <i class="fa fa-search"></i>
        </a>
      </div>
    </div>
    <!-- Search End -->

    <!-- Vitamins Start -->
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
              <h2>{{ vitamin.name }}</h2>
              <p class="card-text">

              <div>
                <h5 id="h5"><b>Function in the Body:
                  </b>{{ vitamin.used_for }}
                </h5>
              </div>
              </p>
              <div class="row ">
                <div class="col-sm-6">
                  <div class="stats">
                    <h4>Frequency: <span>{{ (((vitamin.users).length / vitamin.stats) * 100).toFixed(2) }} %</span>
                    </h4>
                    <div class="the-progress">
                      <span :style="{ 'width': `${parseInt((vitamin.users).length / vitamin.stats * 100)}%` }"></span>
                    </div>
                    <middle class="text-primary"> % of users who add this vitamin </middle>
                  </div>
                </div>

                <div class="col-sm-6">
                  <button v-if="!vitamin_ids.includes(vitamin.id)" :class="`${isHidden ? 'isHidden' : 'button-vitamins'}`"
                    v-on:click="addLists(vitamin)"><i class="fa fa-circle-plus"></i></button>
                  <button v-if="vitamin_ids.includes(vitamin.id)"
                    :class="`${!isHidden ? 'button-vitamins-remove' : 'button-vitamins'}`"
                    v-on:click="removeList(vitamin); indexList()"> <i class="fa fa-trash"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>
      <br>
      <br>
      <br>
    </div>
    <!-- Vitamins End -->

  </div>
</template>

<style>
.recommendations {
  width: 100%;
  height: 100px
}

.search-box {
  position: absolute;
  top: 16%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #2f3640;
  height: 60px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.search-box:hover .search-txt {
  width: 290px;
  padding: 0 6px;
}

.search-box:hover .search-btn {
  background: white;
}

.search-btn {
  color: #00bcd4;
  float: right;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #2f3640;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
}



.search-txt {
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: white;
  font-size: 20px;
  transition: 0.4s;
  line-height: 10px;
  width: 0px;
}

.col-sm-6 {
  display: absolute;
  max-height: 100px;
  height: 100px;
  position: relative;
}

h1 {
  text-align: center;
  margin-top: 5rem;
  margin-bottom: 5rem;
  justify-content: center;
  justify-items: center;
  letter-spacing: 0.5rem;
  color: rgb(0, 85, 255);
}

h2 {
  color: rgb(0, 85, 255);
  font-size: 30px;
  margin-bottom: 0.5rem;
  border-bottom: 4px solid #ff4583ad;
  text-shadow: thistle;
}

.main-title {
  width: 400px;
  margin: 100px auto;
  border: 2px solid rgb(7, 87, 207);
  padding: 10px 20px;
  font-size: 30px;
  position: relative;
  z-index: 1;
  transition: var(--main-transition);

}

.main-title::before {
  content: "";
  width: 12px;
  height: 12px;
  background-color: #ff4583ad;
  position: absolute;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%)
}

.main-title::after {
  content: "";
  width: 12px;
  height: 12px;
  background-color: #ff4583ad;
  position: absolute;
  border-radius: 50%;
  right: -30px;
  top: 50%;
  transform: translateY(-50%)
}

.main-title::before {
  left: -30px;
}

.main-title::after {
  right: -30px;
}

.main-title:hover::before {
  z-index: -1;
  animation: left-move 1s linear forwards;
}

.main-title:hover::after {
  z-index: -1;
  animation: right-move 1s linear forwards;

}

.main-title:hover {
  color: white;
  border: 2px white;
  transition-delay: 0.5s
}

@keyframes left-move {
  50% {
    left: 0;
    width: 12px;
    height: 12px;
  }

  100% {
    left: 0;
    border-radius: 0;
    width: 100%;
    height: 100%;
  }
}

@keyframes right-move {
  50% {
    right: 0;
    width: 12px;
    height: 12px;
  }

  100% {
    right: 0;
    border-radius: 0;
    width: 100%;
    height: 100%;
  }
}

form {
  max-width: 480px;
  margin: 0 auto 1.5rem
}


form .search {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  appearance: none;
  outline: none;
  border: none;

  display: block;
  color: #888;
  font-size: 1.125rem;
  padding: 0.5rem 1rem;
  width: 100%;
}

#h5 {
  font-size: 25px;
  max-height: 120px;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow-y: scroll;

}

h5:hover::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  margin: 5px;
}


::-webkit-scrollbar-thumb {
  background: rgb(0, 85, 255, 0.75);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(0, 85, 255);
}

.button-vitamins-remove {
  appearance: none;
  outline: none;
  background: none;
  position: absolute;
  padding: 0.5rem 1rem;
  background: red;
  background-size: 200%;
  color: white;
  font-size: 1.125rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: 0.4s;
  margin-right: 3rem;
  margin-bottom: 0.4rem;
  right: 0;
  bottom: 0;
  border-radius: 50%;
}

.button-vitamins-remove i {
  font-size: 30px;
}

.button-vitamins {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  position: absolute;
  padding: 0.5rem 1rem;
  background: green;
  background-size: 200%;
  color: white;
  font-size: 1.125rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: 0.4s;
  margin-right: 3rem;
  margin-bottom: 0.4rem;
  right: 0;
  bottom: 0;
  border-radius: 25%;
}

.button-vitamins i {
  font-size: 30px;
}

.button-vitamins .is_hidden {
  opacity: 0;
}

.button-vitamins:hover {
  background-position: right;
}

input {
  text-align: center;
  width: 75px;
}

.quantity-input {
  position: absolute;
  appearance: none;
  outline: none;
  border: none;
  background: none;
  background-size: 200%;
  color: rgb(5, 5, 5);
  font-size: 1.125rem;
  font-weight: bold;
  text-align: end;
  text-transform: uppercase;
  transition: 0.4s;
  margin-bottom: 0.6rem;
  bottom: 0;
  right: 170px
}

.card-mb-3 {
  margin-left: 0.5rem;
  background-color: rgb(204, 204, 204, 0.8);
}


.img-responsive {
  display: grid;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  height: 100%;
  max-height: 100%;
}


h4 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats {
  border-left: solid 5px #ff4583ad;
  border-right: solid 2px rgb(184, 181, 181);
  border-top: solid 2px rgb(184, 181, 181);
  border-bottom: solid 2px rgb(184, 181, 181);
  position: absolute;
  bottom: 0;
  left: 0;
  margin-left: 2rem;
}


.stats span {
  justify-content: flex-end;
  font-size: 25px;
  border: 1px solid #ccc;
  padding: 3px 5px;
  border-radius: 4px;
  color: rgb(0, 115, 255);
  background: rgb(204, 204, 204);
}

.the-progress {
  height: 30px;
  background-color: #eee;
  position: relative;
  min-width: 260px
}

.the-progress span {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #00bcd4;
}
</style>