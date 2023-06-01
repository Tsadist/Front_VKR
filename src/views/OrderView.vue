<script>
import {defineComponent} from 'vue'
import OrderCard from "@/components/OrderCard.vue";
import profileUser from "@/mixins/profileUser";
import orders from "@/mixins/orders";

export default defineComponent({
    name: "OrderView",
    components: {OrderCard},
    mixins: [profileUser, orders],
    mounted() {
        if (!this.isLogin)
            this.$router.push('/')
        this.loadOrders()
    },
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
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            ...
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary">Save changes</button>
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