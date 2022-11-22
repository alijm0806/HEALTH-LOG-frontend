<script setup>
const current = moment().format('YYYY-M-DThh:mm');
</script>
<script>
import axios from "axios";
import moment from 'moment';
import Swal from 'sweetalert2'

export default {
  data: function () {
    return {
      appointment: [],
      appointments: [],
      currentAppointment: {},
    };
  },
  created: function () {
    this.showAppointment();

  },
  methods: {

    showAppointment: function () {
      axios.get("/appointments/" + this.$route.params.id + ".json").then((response) => {
        this.appointment = response.data;
      })
    },
    updateList: function (currentLists_of_vitamin) {
      axios.patch("/appointments/" + this.appointment.id + ".json", this.currentAppointment).then(response => {
        Swal.fire('Updated', 'Appointment successfully updated.', 'warning');
        setTimeout(this.showAppointment, 500);
      })
    },

  }
}
</script>
      
<template>

  <div class="appointment-edit">
    <h1 class="main-title"> EDIT APPOINTMENT</h1>
    <div class="container mt-3">
      <div class="row" id="edit-row">
        <div class="col-lg-6 " id="edit-col">
          <div class="card my-2 list-group-item-success shadow-lg">
            <div class="card-body ">
              <div class="edit-row ">
                <ul class="list-group">
                  <div class="mb-2">
                    <input type="text" class="form-control" placeholder="Address"
                      v-model="currentAppointment.address">{{ this.appointment.address }}
                  </div>
                  <div class="mb-2">
                    <input type="datetime-local" class="form-control" placeholder="Date" :min="`${current}`"
                      v-model="currentAppointment.date">{{
                          this.appointment.date
                      }}
                  </div>
                  <div class="mb-2">
                    <input type="text" class="form-control" placeholder="Phone Number" required="required"
                      maxlength="10" v-model="currentAppointment.phone_number">{{ this.appointment.phone_number }}
                  </div>
                  <div class="mb-2">
                    <select class="form-control" v-model="currentAppointment.doctor_id">
                      <option disabled value="" selected>--select an option--</option>
                      <option value="1">Orthopedic</option>
                      <option value="2">Dermatology</option>
                      <option value="4">Allergy and immunology</option>
                      <option value="5">Family medecine</option>
                      <option value="6">Urology</option>
                      <option value="7">Pathology</option>
                      <option value="8">Psychiatry</option>
                      <option value="9">Surgery</option>
                      <option value="10">Neurology</option>
                      <option value="11">Anesthesiology</option>
                    </select>
                    {{ this.appointment.doctor.speciality }}
                  </div>
                </ul>
              </div>
            </div>
          </div>
          <br>
          <div class="edit-btn">
            <button class="btn btn-success" v-on:click="updateList(currentAppointment)"
              v-bind="appointment.id">SAVE</button>
          </div>
          <router-link to="/Appointments">
            <button class="btn btn-info mt-3" id="edit-btn">
              GO BACK </button>
          </router-link>
        </div>

        <div class="col-lg-6 ">
          <img v-bind:src="appointment.doctor.image_url" class="show-img" alt="show-img">
        </div>

      </div>
    </div>


  </div>
</template>
      
<style>
.show-img {
  /* display: grid; */
  width: 70%;
  max-width: 70%;
  object-fit: cover;
  height: 60%;
  max-height: 60%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  margin: auto
}

#edit-row {
  height: 50%;
  align-items: center;


}


select {
  cursor: pointer;
}

.edit-p {
  font-size: larger;
  font-weight: bold;
  color: blueviolet;
  font-style: italic;
}

.edit-col {
  height: 400px;
}

.mb-2 .form-control {
  height: 50px
}

.mb-2 {
  width: 100%
}
</style>