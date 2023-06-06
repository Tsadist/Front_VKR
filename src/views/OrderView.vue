<script>
import {defineComponent} from 'vue'
import OrderCard from "@/components/OrderCard.vue";
import profileUser from "@/mixins/profileUser";
import orders from "@/mixins/orders";
import {dicStatus} from "@/api/dictionary";
import api from "@/api/api";

export default defineComponent({
    name: "OrderView",
    computed: {
        dic() {
            return dicStatus
        }
    },
    data() {
        return {
            area: 0.0,
            roomType: '',
            cleaningType: '',
            date: new Date(),
            hour: ''
        }
    },
    components: {OrderCard},
    mixins: [profileUser, orders],
    mounted() {
        if (!this.isLogin)
            this.$router.push('/')
        this.loadOrders()
    },
    methods: {
        createOrder(){
            const objSend = {
                "area": this.area,
                "roomType": this.roomType.value,
                "cleaningType": this.cleaningType.value,
                "theDate": this.date,
                "startTime": this.hour,
                "additionServicesId": [1
                ]
            }
            console.log(objSend);
            api.createOrder(objSend);
        }
    }
})
</script>

<template>
    <div class="container p-3">
        <div class="row">
            <div class="col">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <div class="card-text">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">
                                Новый заказ
                            </button>
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                 aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Создание заказа </h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row row-cols-1 g-2">
                                                <div class="col">
                                                    <label for="areaInput" class="form-label">Площадь помещения:</label>
                                                    <input v-model="area" type="number" class="form-control" id="areaInput" step="0.1"
                                                           min="10">
                                                </div>
                                                <div class="col">
                                                    <label for="roomTypeInput" class="form-label">Тип помощения</label>
                                                    <select v-model="roomType" id="roomTypeInput" class="form-select">
                                                        <option disabled value="">Выберите один из вариантов</option>
                                                        <option v-for="type in dic.roomTypes" v-bind:value="type">
                                                            {{ type.text }}
                                                        </option>
                                                    </select>
                                                </div>
                                                <div class="col">
                                                    <label for="cleaningTypeInput" class="form-label">Тип уборки</label>
                                                    <select v-model="cleaningType" id="cleaningTypeInput"
                                                            class="form-select">
                                                        <option disabled value="">Выберите один из вариантов</option>
                                                        <option v-for="type in dic.cleaningTypes" v-bind:value="type">
                                                            {{ type.text }}
                                                        </option>
                                                    </select>
                                                </div>
                                                <div class="col">
                                                    <label for="dateInput" class="form-label">Дата уборки</label>
                                                    <input v-model="date" id="dateInput" class="form-control"
                                                           type="date">
                                                </div>
                                                <div class="col">
                                                    <label for="dateInput" class="form-label">В который час</label>
                                                    <input v-model="hour" id="dateInput" class="form-control"
                                                           type="number" min="0" max="24">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                                Close
                                            </button>
                                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="createOrder">Отправить</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="!orders">
            <div class="col p-3 text-center">
                <h3>Нет заказов</h3>
            </div>
        </div>
        <div class="row row-cols-2">
            <div class="col p-2" v-for="order in orders" :key="order">
                <OrderCard class="h-100" :order-data="order"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>