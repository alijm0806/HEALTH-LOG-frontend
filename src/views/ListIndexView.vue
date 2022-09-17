<script>
import axios from "axios";
export default {
  data: function () {
    return {
      lists_of_vitamins: [],
      list_of_vitamin: [],
      lists: []

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
        for (var i = 0; i < this.lists_of_vitamins.length; i++) {
          for (var j = 0; j < this.lists_of_vitamins[i].quantity; j++) {
            this.lists.push(this.lists_of_vitamins[i]);

          }
        }
        console.log(this.lists)
      })
    },
  }
}



</script>
    
<template>

  <div class="list-index">
    <h1 class="main-title">My List</h1>
    <div>
      <form>
        <input class="form-control" type="datetime-local" placeholder="Select Time" id="Time">
      </form>
    </div>
    <div>
      <div class="list" v-for="list_of_vitamin in lists" v-bind:key="list_of_vitamin.id">
        <div class="list-1">
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </div>
        <div class="list-2">
          {{ list_of_vitamin.vitamin.name }}
        </div>
        <div class="list-3">
          Intake_quantity: {{ list_of_vitamin.intake_quantity }}
        </div>
        <div class="list-4">
          Intake_quantity_left: {{ list_of_vitamin.intake_quantity_left }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#Time {
  width: 200px
}

.list {
  display: flex;
  align-items: center;
  height: 90%;
  background-color: rgba(103, 96, 96, 0.25);
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

.list-2 {
  display: flex;
  align-items: center;
  background-color: #FFF;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  margin: 0.3rem 0.3rem;
  ;
  width: 32%
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
  width: 32%
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
  width: 31%
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