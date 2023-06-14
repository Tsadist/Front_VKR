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
            createUser: {
                "phoneNumber": "",
                "email": "",
                "name": "",
                "surname": "",
                "userRole": "CLEANER"
            },
            vacations: [
                {
                    "startDay": this.formatDate(new Date(2023, 5, 30)),
                    "endDay": this.formatDate(new Date(2023, 6, 13))
                },
                {
                    "startDay": this.formatDate(new Date(2023, 10, 5)),
                    "endDay": this.formatDate(new Date(2023, 10, 19))
                },
                {
                    "startDay": this.formatDate(new Date(2023, 11, 1)),
                    "endDay": this.formatDate(new Date(2023, 11, 7))
                }
            ],
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
    methods: {
        save(){
            console.log(this.vacations)
        },
        formatDate(date){
            let format = date.getFullYear()+ "-" + (date.getUTCMonth() < 10 ? '0' : "") + date.getUTCMonth() + "-" + (date.getUTCDay() < 10 ? '0' : "") + date.getUTCDay() ;
            console.log(date)
            console.log(format)
            return format;
        },
        createWork(){

        }
    }
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
                                        data-bs-target="#createWork">
                                    <b>Новый работник</b>
                                </button>

                                <div class="modal fade" id="createWork"
                                     tabindex="-1" aria-labelledby="exampleModalLabel"
                                     aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Создать нового работника</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="row row-cols-1 g-2">
                                                    <div class="col">
                                                        <label for="inputname" class="form-label">Имя:</label>
                                                        <input v-model="createUser.name" id="inputname" class="form-control" placeholder="Ирина" type="text">
                                                    </div>
                                                    <div class="col">
                                                        <label for="inputsurname" class="form-label">Фамилия:</label>
                                                        <input v-model="createUser.surname" id="inputsurname" class="form-control" placeholder="Огурцова" type="text">
                                                    </div>
                                                    <div class="col">
                                                        <label for="inputemail" class="form-label">Почта:</label>
                                                        <input v-model="createUser.email" id="inputemail" class="form-control" placeholder="example@mail.ru" type="text">
                                                    </div>
                                                    <div class="col">
                                                        <label for="inputphone" class="form-label">Номер телефона:</label>
                                                        <input v-model="createUser.phoneNumber" id="inputphone" class="form-control" placeholder="+7925435345436" type="text">
                                                    </div>
                                                    <div class="col">
                                                        <label for="cleaningTypeInput" class="form-label">Должность сотрудника</label>
                                                        <select v-model="createUser.userRole" id="cleaningTypeInput"
                                                                class="form-select">
                                                            <option disabled value="">Выберите один из вариантов</option>
                                                            <option>MANAGER</option>
                                                            <option>CLEANER</option>
                                                            <option>MODERATOR</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                        data-bs-dismiss="modal">
                                                    Закрыть
                                                </button>
                                                <button type="button" class="btn btn-primary"
                                                        data-bs-dismiss="modal" @click="createWork">
                                                    Создать
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
                                        <button class="btn btn-success w-100" data-bs-toggle="modal"
                                                :data-bs-target="'#editOtpusk' + user.name+user.surname">
                                            Отпуска
                                        </button>
                                        <div class="modal fade" :id="'editOtpusk' + user.name+user.surname"
                                             tabindex="-1" aria-labelledby="exampleModalLabel"
                                             aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLabel">Отпуск
                                                            {{ user.name }} {{ user.surname }}</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                                aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="row row-cols-2 p-1" v-for="(vac, index) in vacations">
                                                            <div class="col">
                                                                <input type="date" class="form-control" :id="'var.start' + index" v-model="vac.startDay">
                                                            </div>
                                                            <div class="col">
                                                                <input type="date" class="form-control" :id="'var.start' + index" v-model="vac.endDay">
                                                            </div>
                                                        </div>
                                                        <div class="row row-cols-2 p-1">
                                                            <div class="col">
                                                                <input type="date" class="form-control" id="start" placeholder="От">
                                                            </div>
                                                            <div class="col">
                                                                <input type="date" class="form-control" id="end" placeholder="До">
                                                            </div>
                                                        </div>
                                                        <div class="row row-cols-1 p-1">
                                                            <div class="col">
                                                                <button type="button" class="btn btn-secondary w-100">
                                                                    Добавить промежуток
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary"
                                                                data-bs-dismiss="modal">
                                                            Закрыть
                                                        </button>
                                                        <button type="button" class="btn btn-primary"
                                                                data-bs-dismiss="modal" @click="save">
                                                            Сохранить
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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