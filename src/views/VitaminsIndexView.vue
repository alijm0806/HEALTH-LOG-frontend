<script>
import axios from "axios";



export default {
  data: function () {
    return {
      vitamins: [],
    };
  },
  created: function () {
    this.indexVitamins();
  },
  methods: {
    indexVitamins: function () {
      axios.get("/vitamins.json").then((response) => {
        console.log("vitamins index", response);
        this.vitamins = response.data;
      });
    },
  },
};
</script>
  
  <template>
  <div class="vitamins-index">
    <h1>All vitamins</h1>
    <div v-for="vitamin in vitamins" v-bind:key="vitamin.id">
      <h2>{{ vitamin.name }}</h2>

    </div>
  </div>
</template>