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
          this.$router.push("/home");
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
  <div class="login-signup">

    <div class="card border-info mb-3">
      <div class="form-Bx">Login</div>
      <div class="card-body-login m-3">
        <h5 class="card-title"></h5>
        <p class="card-text">
        <form v-on:submit.prevent="submit()">
          <ul>
            <li v-for="error in errors" v-bind:key="error" id="errors">{{ error }}</li>
          </ul>
          <p>
            <label for="floatingInput">Email: </label>
          </p>

          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
            v-model="newSessionParams.email">
          <email class="icon" />

          <br>
          <p><label>Password: </label></p>

          <input type="password" class="form-control" id="floatingInput" v-bind:type="fieldType" placeholder="Password"
            minlength="6" v-model="newSessionParams.password">

          <small class="text-success"> Password must be at least 6 characters long</small>

          <br>
          <br>
          <p><button class="btn btn-success" type="submit" value="Submit">Submit</button></p>
          <p>
            <br>
            <br>
            Don't have an account?
            <a v-bind:href="'/Signup'">Register</a>
          </p>
        </form>

        </p>
      </div>

    </div>


  </div>
</template>
  
<style >
.login-signup {
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
  overflow: hidden;
  scroll-behavior: unset;
  width: 100%;
}


.login-signup.input {
  border: solid
}

.card.border-info {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  max-width: fit-content;
  width: 100%;
  height: 95%;
  border-end-end-radius: 50px;
  border-start-start-radius: 50px;
  background-color: rgba(255, 255, 255, 0.7);
}


#floatingInput.form-control {
  width: 90%;
  max-width: 90%;
  border-radius: 25px;
  border-color: #607d8b;
  margin: 1rem
}

.form-Bx {
  font-size: xx-large;
  align-items: flex-start;
  color: #607d8b;
  border-bottom: 4px solid #ff4584;
  letter-spacing: 0.5rem;
  padding-top: 20px;
  width: 90%;
  max-width: 90%;
  margin-right: 10px;
}

#errors {
  color: red
}
</style>