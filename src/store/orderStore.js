import { createStore } from 'vuex'
import api from "@/api/api";
import {dicStatus} from "@/api/dictionary";

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
                // console.log(value.data)
                const data = value.data;
                data.forEach(value => {
                    value.orderStatus = dicStatus.orderStatuses[value.orderStatus];
                    value.roomType = dicStatus.roomTypes[value.roomType];
                    value.cleaningType = dicStatus.cleaningTypes[value.cleaningType];
                })
                commit("setOrders", data)
            })
                .catch(reason => console.log(reason))
        }
    },
    namespaced: true
}
