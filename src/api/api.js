import axios from "axios";

const config = {
    api: 'http://192.168.0.11:8020',
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
    createOrder: function (objData) {
        return axios.post(config.api + "/order/create", objData, {headers: this.getHeadersLogin()});
    },
    deleteOrder: function (orderId) {
        return axios.delete(config.api + "/order/" + orderId + '/delete', {headers: this.getHeadersLogin()});
    },
    editOrder: function (orderId, body) {
        return axios.put(config.api + "/order/" + orderId + '/edit', body, {headers: this.getHeadersLogin()});
    },

};

export default api;