<script>
import axios from "axios";

export default {
  data: function () {
    return {
      lists: [],
    };
  },
  created: function () {
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
    updateList: function () {

      this.lists_of_vitamin.intake_quantity = 1
      this.lists_of_vitamin.intake_quantity_left = 1
      console.log('updating list...')
      axios.patch(`/lists_of_vitamins/286.json`, this.lists_of_vitamin).then(response => {
        console.log(response.data);
        // this.$router.push(`/recipes/${this.recipe.id}`);
      })
    },
  },
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
                    <li class="list-group-item">Name: <span class="fw-bold">{{ list.vitamin.name }}</span></li>
                    <li class="list-group-item">Quantity: <span class="fw-bold">{{ list.quantity }}</span></li>
                    <li class="list-group-item">Intakes: <span class="fw-bold">{{ list.user_id
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
                  <button class="btn btn-danger my-1">
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
</style>