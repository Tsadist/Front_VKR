<script>
import {dicStatus} from "@/api/dictionary";

export default {
    name: "OrderCard",
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
            if(arr[key] === undefined)
                return 'none-' + key;
            return arr[key].text
        }
    }
}
</script>

<template>
    <div class="card shadow-sm">
        <div class="card-body">
            <div class="card-text">
                <div class="card-title">
                    <div class="row row-cols-2">
                        <div class="col">
                            {{ orderData.theDate }} {{ orderData.startTime }}:00 - {{ orderData.duration }} ч.
                        </div>
                        <div class="col text-end" :class="{'text-primary': orderData.orderStatus === 'NO_EMPLOYEE',
                        'text-success': orderData.orderStatus === 'COMPLETED',
                        'text-danger': orderData.orderStatus === 'WAITING_FOR_PAYMENT',
                        'text-secondary': orderData.orderStatus === 'PAID'}">
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
                    <div class="col" v-if="orderData.orderStatus !== 'NO_EMPLOYEE'">
                        {{ orderData.cleaner.name }} {{ orderData.cleaner.surname }}
                        {{ orderData.cleaner.phoneNumber === undefined ? '' : ', ' + orderData.cleaner.phoneNumber }}
                    </div>
                    <div class="col" v-if="orderData.orderStatus === 'NO_EMPLOYEE'">
                        <b>Отсутствует</b>
                    </div>
                </div>
            </div>
            <div class="card-text pt-2">
                <div class="row row-cols-2 g-2">
                    <div class="col" v-if="orderData.orderStatus === 'WAITING_FOR_PAYMENT'">
                        <button class="btn btn-primary w-100">
                            Оплатить
                        </button>
                    </div>
                    <div class="col" v-if="orderData.orderStatus === 'NO_EMPLOYEE'">
                        <button class="btn btn-primary w-100">
                            Изменить
                        </button>
                    </div>

                    <div class="col" v-if="orderData.orderStatus !== 'COMPLETED'">
                        <button class="btn btn-primary w-100">
                            Отменить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>