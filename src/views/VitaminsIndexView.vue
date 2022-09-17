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
    indexVitamins: function () {
      axios.get("/vitamins.json").then((response) => {
        console.log("vitamins index", response);
        this.vitamins = response.data;
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
        console.log("list index", response);
        this.lists_of_vitamins = response.data;
        console.log(this.lists_of_vitamins);

        for (var i = 0; i < this.lists_of_vitamins.length; i++) {
          this.vitamin_ids.push(this.lists_of_vitamins[i].vitamin_id)

        }
        console.log(this.vitamin_ids)
      });

    },
    addVitamins: function (vitamin) {
      this.newList.vitamin_id = vitamin.id
      console.log(this.newList)

      axios.post("/lists_of_vitamins.json", this.newList).then((response) => {
        console.log("lists_of_vitamins index", response);
        this.lists_of_vitamins.push(response.data)
      });
    },
    reloadPage() {
      window.location.reload();
    },
  }
};

</script> 
<template>



  <div class="vitamins-index">

    <h1 class="main-title">All Vitamins</h1>
    <div class="vitamins-index">
      <form @submit.prevent="searchVitamin">
        <input type="text" v-model="searchTerm" placeholder="Search for a Vitamin..." />
        <!-- <button type="submit" >Search</button> -->
      </form>
    </div>
    <div>

      <div>
        <div class="card-mb-3" v-for="vitamin in filterVitamins()">
          <ul>
            <li v-for="error in errors" v-bind:key="error" id="errors">{{ error }}</li>
          </ul>
          <div class="row ">
            <div class=" col-sm-4">
              <img v-bind:src="vitamin.description" class="img-responsive" alt="" />
            </div>

            <div class=" col-sm-8">

              <h2 class="card-title">{{ vitamin.name }}</h2>
              <p class="card-text">
              <h5>Used_for: {{ vitamin.used_for }}</h5>
              <h5>Sources: {{ vitamin.sources }}</h5>
              </p>
              <div class="row ">
                <div class=" col-sm-6">
                  <div class="stats">
                    <h4>Stats: <span>{{ (vitamin.users).length / vitamin.stats * 100}} %</span></h4>
                    <div class="the-progress">
                      <span :style="{'width':`${parseInt((vitamin.users).length / vitamin.stats * 100)}%`}"></span>
                    </div>
                  </div>
                </div>
                <div class=" col-sm-6">
                  <div v-if="!vitamin_ids.includes(vitamin.id)" class="quantity-input">
                    Quantity: <input type="text" v-model="newList.quantity" v-bind="vitamin.id">
                  </div>
                  <button v-if="!vitamin_ids.includes(vitamin.id)"
                    :class="`${isHidden ? 'isHidden' : 'button-vitamins'}`"
                    v-on:click=" addVitamins(vitamin); reloadPage()">Add To List</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<style>
h1 {
  text-align: center;
  margin-top: 5rem;
  margin-bottom: 5rem;
}

h2 {
  color: rgb(0, 85, 255);
  font-size: 0.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 4px solid #ff4583ad;
  text-shadow: thistle;
}

.main-title {
  width: 400px;
  margin: 100px auto;
  border: 2px solid black;
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


form input {
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

.button-vitamins {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: block;
  padding: 0.5rem 1rem;
  background-image: linear-gradient(to right, #19b251 50%, #ff4583e7 50%);
  background-size: 200%;
  color: white;
  font-size: 1.125rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: 0.4s;
  margin-left: auto;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;

}


.button-vitamins:hover {
  background-position: right;
}

input {
  text-align: center;
  width: 75px;
}

.quantity-input {
  position: relative;
  display: inline-block;
  appearance: none;
  outline: none;
  border: none;
  background: none;
  display: block;
  padding: 0.5rem 1rem;
  /* background-image: linear-gradient(to right, #19b251 50%, #ff4583e7 50%); */
  background-size: 200%;
  color: rgb(5, 5, 5);
  font-size: 1.125rem;
  font-weight: bold;
  text-align: end;
  text-transform: uppercase;
  transition: 0.4s;
  margin-left: 40%;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.card-mb-3 {
  margin-left: 0.5rem;
  background-color: rgb(204, 204, 204, 0.65);
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
}


.stats span {
  font-size: 25px;
  border: 1px solid #ccc;
  padding: 3px 5px;
  border-radius: 4px;
  color: rgb(0, 115, 255);
}

.the-progress {
  height: 30px;
  background-color: #eee;
  position: relative;
  min-width: 75%
}

.the-progress span {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #19b251;
}
</style>