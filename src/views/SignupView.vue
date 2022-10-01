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
          this.$router.push("/");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
  
<template>

  <div class="login-signup">


    <div class="card border-info mb-3">
      <div class="form-Bx">Signup</div>
      <div class="card-body-login">
        <h5 class="card-title"></h5>
        <p class="card-text">
        <form v-on:submit.prevent="submit()">
          <h1></h1>
          <ul>
            <li v-for="error in errors" v-bind:key="error" id="errors">{{ error }}</li>
          </ul>
          <p>First Name: <input class="form-control" id="floatingInput" placeholder="first name" type="text"
              v-model="newUserParams.first_name" /></p>

          <p>Last Name: <input class="form-control" id="floatingInput" placeholder="last name" type="text"
              v-model="newUserParams.last_name" /></p>

          <!-- <p>Gender: <input class="form-control" id="floatingInput" placeholder="Gender" type="text"
              v-model="newUserParams.gender" /></p>

          <p>Age: <input class="form-control" id="floatingInput" placeholder="age" type="text"
              v-model="newUserParams.age" /></p> -->

          <p>Email: <input class="form-control" id="floatingInput" placeholder="name@example.com" type="email"
              v-model="newUserParams.email" /></p>

          <p>Password: <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
              minlength="6" v-model="newUserParams.password" />
          </p>

          <p><small class="text-success"> Password must be at least 6 characters long</small></p>

          <p>Password Confirmation:
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password confirmation"
              minlength="6" v-model="newUserParams.password_confirmation" />
          </p>
          <small class="text-success"> Password must be at least 6 characters long</small>
          <br>
          <button class="btn btn-success" type="submit" value="Submit">Submit
          </button>

        </form>
        </p>
      </div>

    </div>
  </div>
  <div class="background"></div>
</template>
<style>
.login-signup {
  position: relative;
  width: 100%;
  height: 70%;


}

.card.border-info {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 70%;
  height: 100%;
  border-radius: 40px;
  color: #ff4584
}

.card-body-login {
  width: 25rem;

  font-size: max-content
}



.form-Bx {
  font-size: xx-large;
  align-items: flex-start;
  color: #607d8b;
  border-bottom: 4px solid #ff4584;
  letter-spacing: 0.5rem;

}

#floatingPassword {
  border-radius: 25px;
  border-color: #607d8b;
}

#errors {
  color: red
}

.btn-btn-succes {
  position: center;
}
</style>