import { createStore } from 'vuex'
import profileStore from "@/store/profileStore";
import orderStore from "@/store/orderStore";

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    profile: profileStore,
    orders: orderStore
  }
})
