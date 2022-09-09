<script>
import axios from "axios";


export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
      fieldType: "password"
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/Vitamins");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
    switchField() {
      this.fieldType === "password" ? "text" : "password";
    }
  },
};
</script>
  
  <template>
  <h1>Login</h1>
  <br>
  <div class="login">
    <p>
      Don't have an account?
      <a v-bind:href="'/Signup'">Register</a>
    </p>
    <form v-on:submit.prevent="submit()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <p>
        <label for="floatingInput">Email: </label>
      </p>
      <div class="Inputs">
        <input type="email" id="floatingInput" placeholder="name@example.com" v-model="newSessionParams.email">
        <email class="icon" />

      </div>
      <br>
      <p><label>Password: </label></p>
      <form action="" class="Inputs">
        <input type="password" v-bind:type="fieldType" placeholder="Password" maxlength="10"
          v-model="newSessionParams.password">
        <br>
        <!-- <button @:click="switchField()"> -->
        <!-- Hide/Show Password -->
        <!-- </button> -->
        <br>
      </form>
      <br>
      <small class="text-success"> Password characters no more than 10</small>

      <br>
      <br>
      <p><button class="btn btn-success" type="submit" value="Submit">Submit</button></p>

    </form>
  </div>

</template>
  
  <style >
  .Inputs {
  
  
    position: start;
    display: flex;
    justify-content: start;
    align-items: start;
    font-size: larger;
  
    margin-bottom: 8px;
    ;
    border: none;
  
    padding: 2px 2px 2px 2px;
    height: 20px;
  }
  </style>