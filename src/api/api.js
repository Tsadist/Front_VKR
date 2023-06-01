import axios from "axios";

const config = {
    api: 'http://192.168.0.16:8020',
}

const api = {
    token: undefined,
    getHeadersLogin: function () {
        return {
            "token": this.token
        }
    },
    login: function (email, password) {
        return axios.post(config.api + "/login", {
            email: email,
            password: password
        }, {})
            .then(value => {
                this.token = value.data.token;
            });
    },
    profile: function () {
        return axios.get(config.api + "/profile", {headers: this.getHeadersLogin()});
    },
    loadOrders: function () {
        return axios.get(config.api + "/orders", {headers: this.getHeadersLogin()});
    },

};

export default api;