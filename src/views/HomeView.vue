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
                    Ваши личные данные
                </div>
                <div class="card-body">
                    <div class="card-text">
                        <div class="row row-cols-2">
                            <div class="col">Номер телефона</div>
                            <div class="col">{{ profile.phoneNumber }}</div>
                        </div>
                        <div class="row row-cols-2">
                            <div class="col">Электронная почта</div>
                            <div class="col">{{ profile.email }}</div>
                        </div>
                        <div class="row row-cols-2" v-if="profile.role !== 'CUSTOMER'">
                            <div class="col">Ваша роль в системе</div>
                            <div class="col">{{ profile.role }}</div>
                        </div>
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
    methods: {
        methodLoginOk(){
            this.loadProfileState()
        }
    }
}
</script>
