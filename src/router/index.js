import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactUsView from '../views/ContactUsView.vue'
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
import VitaminsIndexView from "../views/VitaminsIndexView.vue";
import ListIndexView from "../views/ListIndexView.vue"
import ListShowView from "../views/ListShowView.vue"
import ListEditView from "../views/ListEditView.vue"
import ChartsView from "../views/ChartsView.vue"
import MapView from "../views/MapView.vue"

const routes = [

  {
    path: "/signup",
    name: "signup",
    component: SignupView
  },
  {
    path: "/",
    name: "login",
    component: LoginView
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView
  },
  {
    path: "/contact",
    name: "contact-us",
    component: ContactUsView
  },
  {
    path: "/home",
    name: "home",
    component: HomeView
  },
  {
    path: "/vitamins",
    name: "vitamins-index",
    component: VitaminsIndexView
  },
  {
    path: "/vitamins/mylist",
    name: "lists-index",
    component: ListIndexView
  },
  {
    path: "/vitamins/mylist/:lon",
    name: "list-show",
    component: ListShowView
  },
  {
    path: "/vitamins/mylist/:id/edit",
    name: "list-edit",
    component: ListEditView
  },
  {
    path: "/charts",
    name: "charts",
    component: ChartsView
  },
  {
    path: "/map",
    name: "map",
    component: MapView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ContactUsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
