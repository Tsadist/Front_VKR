<template>
    <div class="container p-3">
        <div class="container" v-if="!isLogin">
            <div class="row justify-content-center p-5">
                <LoginComponent class="col col-lg-6 " :method-ok="methodLoginOk"/>
            </div>
        </div>
        <div class="container p-2" v-if="isLogin">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col d-flex align-items-center justify-content-start">
                            <h5><b>Ваши личные данные</b></h5>
                        </div>
                        <div class="col text-end">
                            <div class="btn btn-danger" @click="exit">
                                Выход
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body card-info" v-if="!isEdit">
                    <div class="card-text">
                        <div class="row row-cols-2 p-1">
                            <div class="col">ФИО</div>
                            <div class="col">{{ profile.name }} {{ profile.surname }}</div>
                        </div>
                        <div class="row row-cols-2 p-1">
                            <div class="col">Электронная почта</div>
                            <div class="col">{{ profile.email }}</div>
                        </div>
                        <div class="row row-cols-2 p-1">
                            <div class="col">Номер телефона</div>
                            <div class="col">{{ profile.phoneNumber }}</div>
                        </div>
                        <div class="row row-cols-2 p-1" v-if="profile.role !== 'CUSTOMER'">
                            <div class="col">Ваша роль в системе</div>
                            <div class="col">{{ profile.role }}</div>
                        </div>
                    </div>
                </div>
                <div class="card-body card-info" v-if="isEdit">
                    <div class="card-text">
                        <div class="row row-cols-3 p-1">
                            <div class="col">ФИО</div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Имя" v-model="profile.name">
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Фамилия" v-model="profile.surname">
                            </div>
                        </div>
                        <div class="row row-cols-2 p-1">
                            <div class="col">Номер телефона</div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="+79204445566"
                                       v-model="profile.phoneNumber">
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-success m-1" data-bs-toggle="modal"
                            data-bs-target="#editEmailPassModel">
                        Изменить почту и пароль
                    </button>
                </div>
                <div class="card-footer" v-if="!isEdit">
                    <button class="btn btn-success m-1" @click="isEdit = true">
                        Редактировать
                    </button>
                </div>
                <div class="card-footer" v-if="isEdit">
                    <button class="btn btn-primary m-1" @click="isEdit = false">
                        Отмена
                    </button>
                    <button class="btn btn-success m-1" @click="saveProfile">
                        Сохранить
                    </button>
                </div>
            </div>
        </div>


        <div class="modal fade" id="editEmailPassModel" tabindex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true" v-if="isLogin">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Редактирование пароля и почты</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row row-cols-1 g-2">
                            <div class="col">
                                <label for="emailInput" class="form-label">
                                    Почта
                                </label>
                                <input class="form-control" id="emailInput" type="email" placeholder="email@mail.ru"
                                       v-model="profile.email">
                            </div>
                            <div class="col">
                                <label class="form-label" for="passInputNew">
                                    Новый пароль
                                </label>
                                <input class="form-control" id="passInputNew" type="password" placeholder="****"
                                       v-model="newPassword">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Закрыть
                        </button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="saveProfileEmail">
                            Сохранить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


import LoginComponent from "@/components/LoginComponent.vue";
import api from "@/api/api";
import {mapActions, mapGetters} from "vuex";
import profileUser from "@/mixins/profileUser";

export default {

    name: 'HomeView',
    components: {
        LoginComponent
    },
    mixins: [profileUser],
    data() {
        return {
            isEdit: false,
            newPassword: '',
        }
    },
    methods: {
        methodLoginOk() {
            this.loadProfileState()
        },
        saveProfile() {
            this.isEdit = false;
            const sendData = {
                "phoneNumber": this.profile.phoneNumber,
                "name": this.profile.name,
                "surname": this.profile.surname
            };
            api.editProfile(sendData).then(value =>
                this.methodLoginOk()
            );
        },
        exit(){
            api.token = '';
            location.reload()
        },
        saveProfileEmail() {
            this.isEdit = false;
            const sendData = {
                "email": this.profile.email,
                "password": this.newPassword
            };
            api.editProfileEmail(sendData).then(value =>
                location.reload()
            );
        }
    }
}
</script>

<style>
.card-info {
    opacity: 0;
    animation: ani 0.7s forwards;
}

@keyframes ani {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>