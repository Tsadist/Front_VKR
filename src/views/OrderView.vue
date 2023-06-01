<script>
import {defineComponent} from 'vue'
import OrderCard from "@/components/OrderCard.vue";

export default defineComponent({
    name: "OrderView",
    components: {OrderCard},
    data() {
        return {
            orders: [
                {
                    cost: 200,
                    orderStatus: "WAITING_FOR_PAYMENT",
                    id: 1,
                    rootType: 'RESIDENTIAL',
                    cleaningType: "REGULAR",
                    area: 24.5,
                    theDate: new Date(),
                    startTime: 10,
                    duration: 2,
                    cleanerId: 4
                },
                {
                    cost: 4000,
                    orderStatus: "PAID",
                    id: 1,
                    rootType: 'COMMERCIAL',
                    cleaningType: "AFTER_REPAIR",
                    area: 24.5,
                    theDate: new Date(),
                    startTime: 9,
                    duration: 2,
                    cleanerId: 4
                },
                {
                    cost: 50,
                    orderStatus: "NO_EMPLOYEE",
                    id: 1,
                    rootType: 'RESIDENTIAL',
                    cleaningType: "GENERAL",
                    area: 24.5,
                    theDate: new Date(),
                    startTime: 7,
                    duration: 5,
                    cleanerId: 4
                }, {
                    cost: 200,
                    orderStatus: "WAITING_FOR_PAYMENT",
                    id: 1,
                    rootType: 'RESIDENTIAL',
                    cleaningType: "REGULAR",
                    area: 24.5,
                    theDate: new Date(),
                    startTime: 10,
                    duration: 2,
                    cleanerId: 4
                },
                {
                    cost: 4000,
                    orderStatus: "PAID",
                    id: 1,
                    rootType: 'COMMERCIAL',
                    cleaningType: "AFTER_REPAIR",
                    area: 24.5,
                    theDate: new Date(),
                    startTime: 9,
                    duration: 2,
                    cleanerId: 4
                },
                {
                    cost: 50,
                    orderStatus: "NO_EMPLOYEE",
                    id: 1,
                    rootType: 'RESIDENTIAL',
                    cleaningType: "GENERAL",
                    area: 24.5,
                    theDate: new Date(),
                    startTime: 7,
                    duration: 5,
                    cleanerId: 4
                },
                {
                    cost: 200,
                    orderStatus: "WAITING_FOR_PAYMENT",
                    id: 1,
                    rootType: 'RESIDENTIAL',
                    cleaningType: "REGULAR",
                    area: 24.5,
                    theDate: new Date(),
                    startTime: 10,
                    duration: 2,
                    cleanerId: 4
                },
                {
                    cost: 200,
                    orderStatus: "COMPLETED",
                    id: 1,
                    rootType: 'RESIDENTIAL',
                    cleaningType: "REGULAR",
                    area: 24.5,
                    theDate: new Date(),
                    startTime: 10,
                    duration: 2,
                    cleanerId: 4
                },
                {
                    cost: 4000,
                    orderStatus: "PAID",
                    id: 1,
                    rootType: 'COMMERCIAL',
                    cleaningType: "AFTER_REPAIR",
                    area: 24.5,
                    theDate: new Date(),
                    startTime: 9,
                    duration: 2,
                    cleanerId: 4
                },
                {
                    cost: 50,
                    orderStatus: "NO_EMPLOYEE",
                    id: 1,
                    rootType: 'RESIDENTIAL',
                    cleaningType: "GENERAL",
                    area: 24.5,
                    theDate: new Date(),
                    startTime: 7,
                    duration: 5,
                    cleanerId: 4
                },
                {
                    cost: 200,
                    orderStatus: "WAITING_FOR_PAYMENT",
                    id: 1,
                    rootType: 'RESIDENTIAL',
                    cleaningType: "REGULAR",
                    area: 24.5,
                    theDate: new Date(),
                    startTime: 10,
                    duration: 2,
                    cleanerId: 4
                },
                {
                    cost: 4000,
                    orderStatus: "PAID",
                    id: 1,
                    rootType: 'COMMERCIAL',
                    cleaningType: "AFTER_REPAIR",
                    area: 24.5,
                    theDate: new Date(),
                    startTime: 9,
                    duration: 2,
                    cleanerId: 4
                },
                {
                    cost: 50,
                    orderStatus: "NO_EMPLOYEE",
                    id: 1,
                    rootType: 'RESIDENTIAL',
                    cleaningType: "GENERAL",
                    area: 24.5,
                    theDate: new Date(),
                    startTime: 7,
                    duration: 5,
                    cleanerId: 4
                }
            ]
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
                            <button class="btn btn-primary">Новый заказ</button>
                        </div>
                    </div>
                </div>
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