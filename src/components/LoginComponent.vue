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
            password: '',
            isReg: false,
            newPassword: '',
            error: '',
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
                    console.log("Login: ")
                    console.log(reason)
                    this.error = reason;
                })
        },
        reg(){
            api.registration(this.email, this.password)
                .then(value => {
                    this.isReg = true;
                })
                .catch(reason => {
                    this.error = reason;
                })
        }
    }
}
</script>

<template>
    <div class="card shadow-lg" v-if="!isReg">
        <div class="card-body">
            <h5 class="card-title">Вход</h5>
            <div class="mb-3">
                <label for="email" class="form-label" >Адрес электронной почты</label>
                <input type="email" class="form-control" id="email" placeholder="name@example.com" v-model="email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Пароль</label>
                <input type="password" class="form-control" id="password" placeholder="***Пароль***" v-model="password">
            </div>

            <div class="mb-3" v-if="error">
                <div style="color: red">
                    {{error}}
                    <div v-if="error.response.data">
                        {{error.response.data.message}}
                    </div>
                </div>
            </div>

            <div class="row row-cols-1 g-2">
                <div class="col">
                    <button type="submit" class="btn btn-primary w-100" @click="login">Войти</button>
                </div>
                <div class="col">
                    <button type="submit" class="btn btn-link w-100" @click="isReg = true">Регистрация</button>
                </div>
            </div>
        </div>
    </div>


    <div class="card shadow-lg" v-if="isReg">
        <div class="card-body">
            <h5 class="card-title">Регистрация</h5>
            <div class="mb-3">
                <label for="email" class="form-label" >Адрес электронной почты</label>
                <input type="email" class="form-control" id="email" placeholder="name@example.com" v-model="email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Пароль</label>
                <input type="password" class="form-control" id="password" placeholder="***Пароль***" v-model="password">
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Повторите пароль</label>
                <input type="password" class="form-control" id="password" placeholder="***Пароль***" v-model="newPassword">
            </div>


            <div class="mb-3" v-if="error">
                <div style="color: red">
                    {{error}}
                    <div v-if="error.response.data">
                        {{error.response.data}}
                    </div>
                </div>
            </div>

            <div class="row row-cols-1 g-2">
                <div class="col">
                    <button type="submit" class="btn btn-primary w-100" @click="reg">Зарегистрироваться</button>
                </div>
                <div class="col">
                    <button type="submit" class="btn btn-primary w-100" @click="isReg = false">Отмена</button>
                </div>
            </div>
        </div>
    </div>


</template>

<style scoped>

</style>