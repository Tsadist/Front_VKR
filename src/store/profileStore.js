import { createStore } from 'vuex'
import api from "@/api/api";

export default {
    state: {
        userProfile: undefined
    },
    getters: {
        userProfile: (state) => {
            return state.userProfile
        },
        isLogin: (state) => {
            return state.userProfile !== undefined
        }
    },
    mutations: {
        setUserProfile(state, userData) {
            state.userProfile = userData;
        }
    },
    actions: {
        loadProfile({state, commit}) {
            api.profile().then(value => {
                commit("setUserProfile", value.data)
            })
        }
    },
    namespaced: true
}
