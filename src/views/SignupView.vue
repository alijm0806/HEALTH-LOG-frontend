<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
  
  <template>

  <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>

        <input class="form-control" id="floatingInput" placeholder="name" type="text" v-model="newUserParams.name" />
      </div>
      <br>
      <div>

        <input class="form-control" id="floatingInput" placeholder="name@example.com" type="email"
          v-model="newUserParams.email" />

      </div>
      <br>
      <div>

        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" maxlength="10"
          v-model="newUserParams.password" />
      </div>

      <p><small class="text-success"> Password characters no more than 10</small></p>
      <br>
      <div>

        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" maxlength="10"
          v-model="newUserParams.password_confirmation" />
      </div>
      <small class="text-success"> Password characters no more than 10</small>
      <br>
      <input class="btn btn-success" type="submit" value="Submit" />
    </form>
  </div>
</template>