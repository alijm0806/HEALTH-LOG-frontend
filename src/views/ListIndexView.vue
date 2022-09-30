<script setup>
var moment = require('moment');
</script>

<script>
import axios from "axios";
import moment from 'moment'

export default {

  data: function () {
    return {
      moment: moment,
      lists: [],
      list: {},
      currentList: {}
    };
  },
  mounted: function () {
    this.indexList()
  },
  methods: {
    myComparator(a, b) {
      return parseInt(a.id, 10) - parseInt(b.id, 10);
    },
    indexList: function () {
      axios.get("/lists_of_vitamins.json").then((response) => {
        console.log("lists_of_vitamins index", response);
        this.lists = response.data;
        console.log(this.lists.sort(this.myComparator));
      })
    },
    deleteList: function (thelist) {
      console.log("deleting list..");
      console.log(this.currentList);
      axios.delete("/lists_of_vitamins/" + thelist.id + ".json").then(response => {
        console.log(response.data)
      })
    },
    refreshList: function (currentList) {
      for (var i = 0; i < this.lists.length; i++) {
        currentList.intake_quantity_left = currentList.quantity
        currentList.intake_quantity = 0
        console.log('looping....')
        this.currentList.intake_quantity_left = this.lists[i].quantity;
        this.lists[i].intake_quantity = 0;
        axios.patch("/lists_of_vitamins/" + this.lists[i].id + ".json", this.currentList).then(response => {
          console.log(response.data);
          // this.$router.push("/vitamins/mylist");
        })
      }
      console.log(this.lists.sort(this.myComparator));
    },
    reloadPage() {
      window.location.reload();
    },
  }
}

</script>
  
<template>

  <div class="lists-index">
    <h1 class="main-title">My List</h1>
    <div>
      <div class="refresh">
        <button class="btn btn-danger " v-on:click="refreshList(currentList); reloadPage()">
          <i class="fa fa-refresh"></i>
        </button>
        <p id="refresh-p">Refresh for a New Day....</p>
      </div>
    </div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-6" v-for="list in lists">
          <div class="card my-2 list-group-item-success shadow-lg">
            <div class="card-body">
              <div class="row ">
                <div class="col-sm-4 flex-column justify-content-center">
                  <img v-bind:src="list.vitamin.images" class="index-img" alt="index-img">
                </div>
                <div class="col-sm-7 d-flex flex-column justify-content-center">
                  <ul class="list-group">
                    <li class="list-group-item">Name: <span class="fw-bold">{{ list.vitamin.name}}</span>
                    </li>
                    <li :class="`${list.quantity !==null ? 'list-group-item' : 'warning-item' }`">
                      Daily Quantity: <span class="fw-bold">{{ list.quantity}}</span>
                    </li>
                    <li class="list-group-item">Intakes Left: <span class="fw-bold">{{list.intake_quantity_left
                    !==null
                    ?
                    list.intake_quantity_left : ''}}
                      </span>
                    </li>
                    <li class="list-group-item">Last Intake was: <span class="fw-bold">{{list.intake_quantity !== 0 &&
                    list.intake_quantity !==null ?
                    moment(list.updated_at).fromNow() : ""}}
                      </span>
                    </li>
                  </ul>
                  <router-link :to="`/vitamins/mylist/${list.id}/edit`">
                    <small v-if="list.quantity ==null" class="text-danger"><i
                        class="fa fa-exclamation-triangle"></i>Please enter yourDaily quantity</small>
                  </router-link>
                </div>
                <div class="col-sm-1 d-flex flex-column justify-content-center align-items-center">
                  <a v-bind:href="`/vitamins/mylist/${list.id}`" class="btn btn-warning my-1">
                    <i class="fa fa-eye"></i>
                  </a>
                  <a v-bind:href="`/vitamins/mylist/${list.id}/edit`" class="btn btn-primary my-1">
                    <i class="fa fa-pen"></i>
                  </a>
                  <button class="btn btn-danger my-1" v-on:click="deleteList(list); reloadPage()">
                    <i class="fa fa-trash"></i>
                  </button>
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
#refresh-p {
  color: blueviolet;
  font-size: larger;
  display: inline-block;
  margin-left: 1rem;
}

.warning-item {
  background-color: rgb(0, 191, 255)
}

.index-img {

  border-radius: 50%;
  display: grid;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: cover;
}

#inlineFormCustomSelect {
  display: flex;
  align-items: center;
  justify-content: content;
}
</style>