<script>

export default {
    name: "OrderCard",
    data() {
        return {
            roomTypes: {
                RESIDENTIAL: {
                    text: "Жилое",
                },
                COMMERCIAL: {
                    text: "Коммерческое"
                },
            },
            cleaningTypes: {
                REGULAR: {
                    text: "Регулярная",
                },
                GENERAL: {
                    text: "Генеральная"
                },
                AFTER_REPAIR: {
                    text: "После ремонта"
                },
            },
            orderStates: {
                COMPLETED: {
                    text: "Завершена",
                },
                PAID: {
                    text: "Оплачено"
                },
                WAITING_FOR_PAYMENT: {
                    text: "Ожидает оплаты"
                },
                NO_EMPLOYEE: {
                    text: "Нет работника"
                },
            }
        }
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
        getTextStatus(arr, key){
            if(key === undefined)
                return 'none';
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
                            {{ getTextStatus(orderStates, orderData.orderStatus) }}
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
                        {{ getTextStatus(roomTypes, orderData.roomType) }}
                    </div>
                </div>
                <div class="row row-cols-2">
                    <div class="col">
                        <b>Тип уборки:</b>
                    </div>
                    <div class="col">
                        {{ getTextStatus(cleaningTypes, orderData.cleaningType) }}
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
                    <div class="col">
                        {{ orderData.cleaner.name }} {{ orderData.cleaner.surname }} {{ orderData.cleaner.phoneNumber === undefined ? '' : ', ' + orderData.cleaner.phoneNumber }}
                    </div>
                </div>
            </div>
            <div class="card-text pt-2">
                <button class="btn btn-primary" v-if="orderData.orderStatus === 'WAITING_FOR_PAYMENT'">Оплатить</button>
                <button class="btn btn-primary" v-if="orderData.orderStatus === 'NO_EMPLOYEE'">Изменить</button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>