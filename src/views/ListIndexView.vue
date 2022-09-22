<script>
import axios from "axios";

export default {
  data: function () {
    return {
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
        console.log("lists_of_vitamins show", response);
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
    reloadPage() {
      window.location.reload();
    },
  }
}

</script>
  
<template>

  <div class="lists-index">
    <h1 class="main-title">My List</h1>
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-6" v-for="list in lists">
          <div class="card my-2 list-group-item-success shadow-lg">
            <div class="card-body">
              <div class="row ">
                <div class="col-sm-4 flex-column justify-content-center">
                  <img v-bind:src="list.vitamin.images" class="show-img" alt="show-img">
                </div>
                <div class="col-sm-7 d-flex flex-column justify-content-center">
                  <ul class="list-group">
                    <li class="list-group-item">Name: <span class="fw-bold">{{ list.vitamin.name}}</span>
                    </li>
                    <li class="list-group-item">Quantity: <span class="fw-bold">{{ list.quantity}}</span>
                    </li>
                    <li class="list-group-item">Intakes: <span class="fw-bold">{{ list.id
                    }}</span></li>
                  </ul>
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
.show-img {

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