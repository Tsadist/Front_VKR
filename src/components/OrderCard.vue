<script>
import {dicStatus} from "@/api/dictionary";
import api from "@/api/api";
import OrderInputModal from "@/components/OrderInputModal.vue";
import profileUser from "@/mixins/profileUser";

export default {
    name: "OrderCard",
    components: {OrderInputModal},
    mixins: [profileUser],
    computed: {
        dicOrder() {
            return dicStatus.orderStatuses
        },
        dicCleaning() {
            return dicStatus.cleaningTypes
        },
        dicRoom() {
            return dicStatus.roomTypes
        }
    },
    data() {
        return {}
    },
    props: {
        additionalService: {
            type: Array,
            default: []
        },
        updateView: {
            type: Function,
            default: function () {
            }
        },
        orderData: {
            type: Object,
            default: {
                name: "Name",
                cost: 2,
                orderStatus: "new",
                id: 1,
                rootType: 'type',
                cleaningType: "clType",
                area: 24.5,
                theDate: new Date(),
                startTime: 10,
                duration: 2,
                cleanerId: 4
            }
        }
    },
    methods: {
        getTextStatus(arr, key) {
            console.log(arr)
            if (key === undefined)
                return 'none';
            if (typeof key === 'object')
                return key.text;
            if (arr[key] === undefined)
                return 'none-' + key;
            return arr[key].text
        },
        deleteThis() {
            api.deleteOrder(this.orderData.id).then(value => this.updateView())
        },
        editOk(value) {
            const data = {
                "area": value.area,
                "roomType": value.roomType.value,
                "cleaningType": value.cleaningType.value,
                "theDate": value.theDate,
                "startTime": value.startTime,
                "additionServicesId": value.additionServicesId
            };
            api.editOrder(value.id, data);
        },
        getAdditionalData(id){
            console.log("id: " + id)
            for (let i = 0; i < this.additionalService.length; i++) {
                if(this.additionalService[i].id === id)
                    return this.additionalService[i];
            }
            return {};
        },
        payment(){
            api.paymentOrder(this.orderData.id)
                .then(value => {
                    window.location.replace(value.data.paymentURL);
                })
        }
    }
}
</script>

<template>
    <div class="card shadow-sm" v-if="orderData.orderStatus !== undefined && orderData.cleaningType !== undefined">
        <div class="card-body">
            <div class="card-text">
                <div class="card-title">
                    <div class="row row-cols-2">
                        <div class="col">
                            {{ orderData.theDate }} {{ orderData.startTime }}:00 - {{ orderData.duration }} ч.
                        </div>
                        <div class="col text-end" :class="{'text-primary': orderData.orderStatus.value === 'NO_EMPLOYEE',
                        'text-success': orderData.orderStatus.value === 'COMPLETED',
                        'text-danger': orderData.orderStatus.value === 'WAITING_FOR_PAYMENT',
                        'text-secondary': orderData.orderStatus.value === 'PAID'}">
                            {{ getTextStatus(dicOrder, orderData.orderStatus) }}
                        </div>
                    </div>
                </div>

            </div>
            <div class="card-text">
                <div class="row row-cols-2">
                    <div class="col">
                        <b>Площадь:</b>
                    </div>
                    <div class="col">
                        {{ orderData.area }} м2
                    </div>
                </div>
                <div class="row row-cols-2">
                    <div class="col">
                        <b>Адрес:</b>
                    </div>
                    <div class="col">
                        {{ orderData.address === undefined || orderData.address === '' || orderData.address === null ? 'Не указан' : orderData.address }}
                    </div>
                </div>
                <div class="row row-cols-2">
                    <div class="col">
                        <b>Тип помещения:</b>
                    </div>
                    <div class="col">
                        {{ getTextStatus(dicRoom, orderData.roomType) }}
                    </div>
                </div>
                <div class="row row-cols-2">
                    <div class="col">
                        <b>Тип уборки:</b>
                    </div>
                    <div class="col">
                        {{ getTextStatus(dicCleaning, orderData.cleaningType) }}
                    </div>
                </div>
                <div class="row row-cols-2">
                    <div class="col">
                        <b>Стоимость:</b>
                    </div>
                    <div class="col">
                        {{ orderData.cost }} р
                    </div>
                </div>

                <div class="row row-cols-2">
                    <div class="col">
                        <b>Исполнитель:</b>
                    </div>
                    <div class="col" v-if="orderData.orderStatus.value !== 'NO_EMPLOYEE'">
                        {{ orderData.cleaner.name }} {{ orderData.cleaner.surname }}
                        {{ orderData.cleaner.phoneNumber === undefined ? '' : ', ' + orderData.cleaner.phoneNumber }}
                    </div>
                    <div class="col" v-if="orderData.orderStatus.value === 'NO_EMPLOYEE'">
                        <b>Отсутствует</b>
                    </div>
                </div>
                <div class="row row-cols-2" v-if="additionalService !== undefined">
                    <div class="col">
                        <b>Доп. услуги:</b>
                    </div>
                    <div class="col">
                        <div class="row g-2">
                            <div class="col"  v-for="additionalId in orderData.additionServicesId" :key="additionalId">
                                <div class="badge rounded-pill bg-secondary">
                                    {{ getAdditionalData(additionalId).title }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-text pt-2">
                <div class="row row-cols-2 g-2">
                    <div class="col" v-if="orderData.orderStatus.value === 'WAITING_FOR_PAYMENT'">
                        <button class="btn btn-primary w-100"  v-if="isRoleOr(['CUSTOMER'])" @click="payment">
                            Оплатить
                        </button>
                    </div>
                    <div class="col" v-if="orderData.orderStatus.value === 'NO_EMPLOYEE'">
                        <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal"
                                :data-bs-target="'#edit' + orderData.id">
                            Изменить
                        </button>
                        <order-input-modal :id="'edit' + orderData.id" :ok="editOk" :title="'Редактировать заказ'"
                                           :data="orderData" :additional-service="additionalService"/>
                    </div>

                    <div class="col" v-if="orderData.orderStatus.value !== 'COMPLETED' && isRoleOr(['CUSTOMER'])">
                        <button class="btn btn-primary w-100" @click="deleteThis">
                            Отменить
                        </button>

                    </div>
                    <div class="col" v-if="orderData.orderStatus.value !== 'COMPLETED' && isRoleOr(['CLEANER'])">
                        <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal"
                                :data-bs-target="'#otkas' + orderData.id">
                            Отказаться от заказа
                        </button>
                        <div class="modal fade" :id="'otkas' + orderData.id" tabindex="-1" aria-labelledby="exampleModalLabel"
                             aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Отказаться от заказа</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row row-cols-1 g-2">
                                            <div class="col">
                                                <label for="chatName" class="form-label">Какая причиная отказа?</label>
                                                <input type="text" class="form-control" id="chatName" placeholder="Причина отказа">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                            Закрыть
                                        </button>
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="createTopic">
                                            Отказаться
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
    <div class="card shadow-sm" v-else>
        <div class="card-body">
            <h3>Не валидные данные</h3>
        </div>
    </div>
</template>

<style scoped>

</style>