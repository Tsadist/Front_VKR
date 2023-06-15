<script>
import {defineComponent} from 'vue'
import OrderInputModal from "@/components/OrderInputModal.vue";
import profileUser from "@/mixins/profileUser";

export default defineComponent({
    name: "ApplicationReqView",
    components: {OrderInputModal},
    mixins: [profileUser],
    mounted() {
        if (!this.isLogin)
            this.$router.push('/')
    },
    data() {
        return {
            applications: [
                {
                    "nameCleaner": "Татьяна",
                    "surnameCleaner": "Петрова",
                    "numberPhoneCleaner": "+79202113428",
                    "orderId": 25,
                    "durationOrder": 2.5,
                    'message': "Далеко. Это место находится в другой части города",
                    'status': "OK"
                },
                {
                    "nameCleaner": "Елена",
                    "surnameCleaner": "Васильева",
                    "numberPhoneCleaner": "+79513472048",
                    "orderId": 20,
                    "durationOrder": 1.5,
                    'message': "Я не занимаюсь уборкой лотков",
                    'status': "REJECTED"
                },
                {
                    "nameCleaner": "Елена",
                    "surnameCleaner": "Васильева",
                    "numberPhoneCleaner": "+79513472048",
                    "orderId": 29,
                    "durationOrder": 1,
                    'message': "В другой город не могу поехать",
                    'status': "REJECTED"
                },
                {
                    "nameCleaner": "Татьяна",
                    "surnameCleaner": "Петрова",
                    "numberPhoneCleaner": "+79202113428",
                    "orderId": 17,
                    "durationOrder": 2,
                    'message': "Не хватает для такой площади материалов",
                    'status': "CREATE"
                }
            ]
        }
    }
})
</script>

<template>
    <div class="container p-2">

        <div class="row row-cols-1 g-2">
            <div class="col">
                <div class="card">
                    <div class="card-header">
                        <div class="row row-cols-2">
                            <div class="col d-flex align-items-center justify-content-start">
                                <h5><b>Заявки на отмену заказов</b></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row row-cols-2 g-2 p-2">
            <div class="col" v-for="app in applications">
                <div class="card h-100">
                    <div class="card-header">
                        <div class="row">
                            <div class="col">
                                Ордер #{{ app.orderId }}
                            </div>
                            <div class="col">
                                {{app.status}}
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row row-cols-2 g-2">
                            <div class="col">
                                Продолжительность:
                            </div>
                            <div class="col">
                                {{ app.durationOrder }}ч.
                            </div>
                            <div class="col">
                                Работник:
                            </div>
                            <div class="col">
                                {{ app.nameCleaner }} {{ app.surnameCleaner }}, {{ app.numberPhoneCleaner }}
                            </div>
                            <div class="col">
                                Причина:
                            </div>
                            <div class="col">
                                {{ app.message }}
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="row row-cols-2 g-2" v-if="app.status !== 'OK' && app.status !== 'REJECTED'">
                            <div class="col">
                                <div class="btn w-100 btn-success">
                                    Подтвердить
                                </div>
                            </div>
                            <div class="col">
                                <div class="btn w-100 btn-danger">
                                    Отказать
                                </div>
                            </div>
                        </div>

                        <div class="row row-cols-1 g-2" v-else>
                            <div class="col">
                                Выбор сделан
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>