<script>
import axios from "axios";

export default {
  data: function () {
    return {
      appointments: [],
      appointment: {},
      newAppointment: {},
      currentAppointment: {},
    };
  },
  mounted: function () {
    this.indexAppointments()
  },
  methods: {

    indexAppointments: function () {
      axios.get("/appointments.json").then((response) => {
        this.appointments = response.data;
      })
    },
    addAppointments: function (appointment) {
      axios.post("/appointments.json", this.newAppointment).then((response) => {
        this.appointments.push(response.data);
      });
    },
    reloadPage() {
      window.location.reload();
    },

    deleteAppointments: function (theAppointment) {
      axios.delete("/appointments/" + theAppointment.id + ".json").then(response => {
      })
    },
  }
}
</script>


<template>

  <div class="appointments-index">
    <h1 class="main-title">APPOINTMENTS</h1>
    <!-- Add appointments Start-->
    <div class="mt-6">
      <div class="row">
        <div class="col">
          <p class="h3 text-success fw-bold">Add Appointments :</p>
          <p class="fst-italic"></p>
        </div>
      </div>
    </div>
    <div class="container mt-6">
      <div class="row">
        <div class="col-md-4">
          <form>
            <div class="mb-3">
              <input type="text" class="form-control" placeholder="Address" required="required"
                v-model="newAppointment.address">
            </div>
            <div class="mb-3">
              <input type="datetime-local" class="form-control" placeholder="Date" required="required"
                v-model="newAppointment.date">
            </div>
            <div class="mb-3">
              <input type="text" class="form-control" placeholder="Phone Number" required="required" maxlength="10"
                v-model="newAppointment.phone_number">
            </div>
            <div class="mb-3">
              <select class="form-control" required="required" v-model="newAppointment.doctor_id">
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
              <small class="text-danger"> Please select a doctor speciality from the list</small>
            </div>

            <div class="mb-2">
              <button class="btn btn-success" id="edit-btn" v-on:click="addAppointments(); reloadPage()"><i
                  class=" fa fa-plus-circle"></i> CREATE
              </button>
            </div>
          </form>
        </div>
      </div>
      <br>
      <br>
      <br>
      <!-- Add appointments End-->
      <!-- Upcoming appointments Start-->
      <div class="mt-6">
        <div class="row">
          <div class="col">
            <p class="h3 text-success fw-bold">Upcoming Appointments :</p>
            <p class="fst-italic"></p>
          </div>
        </div>
      </div>

      <div class="container mt-3">
        <div class="row">
          <div class="col-md-10" v-for="appointment in appointments">
            <div class="card my-2 list-group-item-success shadow-lg">
              <div class="card-body">
                <div class="row ">
                  <div class="col-sm-4 flex-column justify-content-center">
                    <img v-bind:src="appointment.doctor.image_url" class="index-img" alt="index-img">
                  </div>
                  <div class="col-sm-7 d-flex flex-column justify-content-center">
                    <ul class="list-group">
                      <li class="list-group-item">Address: <span class="fw-bold">{{appointment.address}}</span>
                      </li>
                      <li class="list-group-item">
                        Date: <span class="fw-bold">{{appointment.date}}</span>
                      </li>
                      <li class="list-group-item">Speciality:<span class="fw-bold">
                          {{appointment.doctor.speciality}}</span>
                      </li>
                      <li class="list-group-item">
                        Phone Number: <span class="fw-bold">{{appointment.phone_number}}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="col-sm-1 d-flex flex-column justify-content-center align-items-center">
                    <a v-bind:href="`/appointments/${appointment.id}`" class="btn btn-warning my-1">
                      <i class="fa fa-eye"></i>
                    </a>
                    <a v-bind:href="`/Appointments/${appointment.id}/edit`" class="btn btn-primary my-1">
                      <i class="fa fa-pen"></i>
                    </a>
                    <button class="btn btn-danger my-1" v-on:click="deleteAppointments(appointment); reloadPage()">
                      <i class="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Upcoming appointments End-->
    </div>
  </div>
</template>


<style>
.mb-3 .form-control {
  width: 470px;
  height: 55px;
}
</style>