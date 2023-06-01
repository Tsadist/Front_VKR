<script>

import api from "@/api/api";

export default {
    name: 'LoginComponent',
    components: {

    },
    props: {
        methodOk: {
            type: Function
        }
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login(){
            api.login(this.email, this.password)
                .then(value => {
                    console.log("Login: " + value)
                    this.methodOk();
                })
                .catch(reason => {
                    console.log("Login: " + reason)
                })
        }
    }
}
</script>

<template>
    <div class="card shadow-lg">
        <div class="card-body">
            <h5 class="card-title">Вход</h5>
            <div class="mb-3">
                <label for="email" class="form-label" >Адрес электронной почты</label>
                <input type="email" class="form-control" id="email" placeholder="name@example.com" v-model="email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Пароль</label>
                <input type="password" class="form-control" id="password" placeholder="тут" v-model="password">
            </div>

            <div class="row">
                <div class="col">
                    <button type="submit" class="btn btn-primary w-100" @click="login">Войти</button>
                </div>
                <div class="col">
                    <button type="submit" class="btn btn-primary w-100">Регистрация</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>