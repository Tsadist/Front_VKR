import { createStore } from 'vuex'
import api from "@/api/api";

export default {
    state: {
        orders: []
    },
    getters: {
        orders: (state) => {
            return state.orders
        },
    },
    mutations: {
        setOrders(state, orders) {
            state.orders = orders;
        }
    },
    actions: {
        loadOrders({state, commit}) {
            api.loadOrders().then(value => {
                console.log(value.data)
                commit("setOrders", value.data)
            })
                .catch(reason => console.log(reason))
        }
    },
    namespaced: true
}
