import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderView from "@/views/OrderView.vue";
import ScheduleView from "@/views/ScheduleView.vue";
import WorkersUserView from "@/views/WorkersUserView.vue";
import ChatsView from "@/views/ChatsView.vue";
import RegistrationVerify from "@/views/RegistrationVerify.vue";
import ApplicationReqView from "@/views/ApplicationReqView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: ScheduleView
  },
  {
    path: '/workers',
    name: 'workers',
    component: WorkersUserView
  },
  {
    path: '/chats',
    name: 'chats',
    component: ChatsView
  },
  {
    path: '/registration',
    name: 'registrationVerify',
    component: RegistrationVerify
  },
  {
    path: '/applications',
    name: 'applications',
    component: ApplicationReqView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
