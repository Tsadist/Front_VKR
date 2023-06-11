<script>
import {defineComponent} from 'vue'
import profileUser from "@/mixins/profileUser";
import orders from "@/mixins/orders";
import api from "@/api/api";

export default defineComponent({
    name: "WorkersUserView",
    mixins: [profileUser],
    mounted() {
        if (!this.isLogin)
            this.$router.push('/')
        api.loadUserAll().then(value => this.users = value.data)
    },
    data() {
        return {
            users: [
                {
                    id: 2,
                    "name": "nameUser",
                    "surname": "Surname",
                    "phoneNumber": "+number",
                    "email": "emeial@mail.ru",
                    "role": "ROLE",
                },
                {
                    id: 3,
                    "name": "DFAdfa",
                    "surname": "sefsewa",
                    "phoneNumber": "+3598235",
                    "email": "awt@mail.ru",
                    "role": "USER",
                }
            ]
        }
    },
})
</script>

<template>

    <div class="container p-2">
        <div class="row row-cols-1 g-2">
            <div class="col">
                <div class="card">
                    <div class="card-header">
                        <div class="row row-cols-2">
                            <div class="col d-flex align-items-center justify-content-start">
                                <h5><b>Работники</b></h5>
                            </div>
                            <div class="col">
                                <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal"
                                        data-bs-target="#templateModel">
                                    <b>Новый работник</b>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="row row-cols-2 g-2">
                    <div class="col" v-for="user in users" :key="user.id">
                        <div class="card">
                            <div class="card-header">
                                <b>ФИО: </b>{{ user.name }} {{ user.surname }}
                            </div>
                            <div class="card-body">
                                <div class="row row-cols-2 g-2">
                                    <div class="col">
                                        Номер телефона
                                    </div>
                                    <div class="col">
                                        {{ user.phoneNumber }}
                                    </div>
                                    <div class="col">
                                        Электронная почта
                                    </div>
                                    <div class="col">
                                        {{ user.email }}
                                    </div>
                                    <div class="col">
                                        Должность в системе
                                    </div>
                                    <div class="col">
                                        {{ user.role }}
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="row row-cols-3 g-2">
                                    <div class="col">
                                        <button class="btn btn-success w-100">
                                            Откуска
                                        </button>
                                    </div>
                                    <div class="col">
                                        <button class="btn btn-warning w-100">
                                            Изменить должность
                                        </button>
                                    </div>
                                    <div class="col">
                                        <button class="btn btn-danger w-100">
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>