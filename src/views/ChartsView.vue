<template>
  <div class="charts">

    <div class="chartBox">
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  </div>
</template>


<script>
import { faThLarge } from "@fortawesome/free-solid-svg-icons";
import { bottom } from "@popperjs/core";
import axios from "axios";
import chart from 'chart.js/auto';
import { removeDotSegments } from "uri-js";


export default {
  name: 'HomeView',
  data: function () {
    return {

      vitamins: [],
      labels1: [],
      numbers1: [],
      users: [],
      menUsers: [],
    };
  },
  mounted() {
    this.indexVitamins();
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },

  methods: {
    myComparator(a, b) {
      return parseInt(a.id, 10) - parseInt(b.id, 10);
    },
    indexVitamins: function () {
      axios.get("/vitamins.json").then((response) => {
        console.log("vitamins index", response);
        this.vitamins = response.data;
        this.vitamins.sort(this.myComparator);
        console.log(this.vitamins);
        console.log("LOOPING....");

        for (var i = 0; i < this.vitamins.length; i++) {
          // parseInt((vitamin.users).length / vitamin.stats * 100
          this.numbers1.push(parseInt((this.vitamins[i].users.length) / this.vitamins[i].stats * 100).toFixed(2));
          this.labels1.push(this.vitamins[i].name);
        };

        console.log(this.labels1);
        console.log(this.numbers1);

        const ctx = document.getElementById('myChart');

        const myChart = new chart(ctx, {
          type: 'doughnut',
          data: {
            labels: this.labels1,
            datasets: [{
              label: '%',
              data: this.numbers1,

              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 255, 88, 0.5)',
                'rgba(155, 162, 235, 0.9)',
                'rgba(133, 33, 86, 0.5)',
                'rgba(22, 22, 22, 0.5)',
                'rgba(199, 199, 22, 0.5)',
                'rgba(255, 159, 255)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              hoverOffset: 5,
              borderWidth: 3,
              holeSize: 0.6,
              animationSpeed: 0.5
            }]
          },
          options: {
            plugins: {


              title: {
                display: true,
                text: 'VITAMINS FREQUENCY (%)',
                color: 'red',
                font: {
                  size: 40
                }
              },
              legend: {
                position: bottom,
                fontSize: 30,
                labels: {
                  // This more specific font property overrides the global property
                  font: {
                    size: 20
                  }
                },
              },

            },
          }
        });

      })
    }

  }

}


</script>

<style>
.chartBox {
  margin-top: 250px;
  border-radius: 20px;
  border: solid 3px rgba(255, 26, 104, 1);
  background: #fff;
}

text {
  color: red;
}
</style>