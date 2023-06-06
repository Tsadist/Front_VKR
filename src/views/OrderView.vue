<script>
import {defineComponent} from 'vue'
import OrderCard from "@/components/OrderCard.vue";
import profileUser from "@/mixins/profileUser";
import orders from "@/mixins/orders";
import {dicStatus} from "@/api/dictionary";
import api from "@/api/api";
import OrderInputModal from "@/components/OrderInputModal.vue";

export default defineComponent({
    name: "OrderView",
    computed: {
        dic() {
            return dicStatus
        }
    },
    data() {
        return {}
    },
    components: {OrderInputModal, OrderCard},
    mixins: [profileUser, orders],
    mounted() {
        if (!this.isLogin)
            this.$router.push('/')
        this.loadOrders()
    },
    methods: {
        createOrderOk(value){
            const objSend = {
                "area": value.area,
                "roomType": value.roomType.value,
                "cleaningType": value.cleaningType.value,
                "theDate": value.theDate,
                "startTime": value.startTime,
                "additionServicesId": [1
                ]
            }
            console.log(objSend);
            api.createOrder(objSend).then(() => this.loadOrders());
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
                                    data-bs-target="#createModal">
                                Новый заказ
                            </button>
                            <order-input-modal id="createModal" :ok="createOrderOk" :title="'Новый заказ'"/>
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
                <OrderCard class="h-100" :order-data="order" :update-view="loadOrders"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>