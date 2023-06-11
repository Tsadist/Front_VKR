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
        return {
            additionalService: []
        }
    },
    components: {OrderInputModal, OrderCard},
    mixins: [profileUser, orders],
    mounted() {
        if (!this.isLogin)
            this.$router.push('/')
        this.loadOrders()
        api.loadAdditionService().then(value => {
            this.additionalService = value.data
        })
    },
    methods: {
        createOrderOk(value) {
            const objSend = {
                "area": value.area,
                "address": value.address,
                "roomType": value.roomType.value,
                "cleaningType": value.cleaningType.value,
                "theDate": value.theDate,
                "startTime": value.startTime,
                "additionServicesId": value.additionServicesId
            }
            console.log(objSend);
            api.createOrder(objSend).then(() => this.loadOrders());
        }
    }
})
</script>

<template>
    <div class="container p-3">
        <div class="row row-cols-1 g-2">

            <div class="col">
                <div class="card">
                    <div class="card-header">
                        <div class="row row-cols-2">
                            <div class="col d-flex align-items-center justify-content-start">
                                <h5><b>Заказы</b></h5>
                            </div>
                            <div class="col text-end" v-if="isRoleOr(['CUSTOMER'])">
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                        data-bs-target="#createModal">
                                    Новый заказ
                                </button>
                            </div>
                            <order-input-modal id="createModal" :ok="createOrderOk" :title="'Новый заказ'" :additional-service="additionalService"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="!orders || orders.length === 0">
            <div class="col p-3 text-center">
                <h3>Нет заказов</h3>
            </div>
        </div>
        <div class="row row-cols-2">
            <div class="col p-2" v-for="order in orders" :key="order">
                <OrderCard class="h-100" :order-data="order" :update-view="loadOrders" :additional-service="additionalService"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>