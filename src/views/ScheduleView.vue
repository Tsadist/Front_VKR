<script>
import {defineComponent} from 'vue'
import profileUser from "@/mixins/profileUser";
import OrderInputModal from "@/components/OrderInputModal.vue";
import api from "@/api/api";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export default defineComponent({
    name: "ScheduleView",
    components: {OrderInputModal},
    mixins: [profileUser],
    data() {
        return {
            schedule: [],
            scheduleTemplate: [],
            headSchedule: [
                {text: "Вск"},
                {text: "Пн"},
                {text: "Вт"},
                {text: "Ср"},
                {text: "Чт"},
                {text: "Пт"},
                {text: "Сб"},
            ]
        }
    },
    computed: {
        parsingSchedule() {
            const temp = JSON.parse(JSON.stringify(this.schedule));
            for (let i = 0; i < temp.length; i++) {
                for (let j = 0; j < 7; j++) {
                    if (temp[i].objDays['' + j] === undefined) {
                        temp[i].objDays['' + j] = {startTime: 0, endTime: 0}
                    }
                }
            }
            return temp.sort(function (a, b) {
                return a.numberWeek > b.numberWeek
            });
        },
        parsingScheduleTemplate() {
            const temp = JSON.parse(JSON.stringify(this.scheduleTemplate));
            for (let i = 0; i < temp.length; i++) {
                for (let j = 0; j < 7; j++) {
                    if (temp[i].objDays['' + j] === undefined) {
                        temp[i].objDays['' + j] = {startTime: 0, endTime: 0}
                    }
                }
            }
            return temp;
        }
    },
    mounted() {
        if (!this.isLogin)
            this.$router.push('/')

        this.schedule = []
        this.scheduleTemplate = []
        for (let i = 0; i < 53; i++) {
            const mapDay = {}
            for (let j = 0; j < 7; j++) {
                if (getRandomInt(100) > 50)
                    continue;
                mapDay['' + j] = {
                    "startTime": getRandomInt(12),
                    "endTime": getRandomInt(12) + 12
                }
            }
            this.schedule[i] = {
                numberWeek: i,
                objDays: mapDay
            }
        }

        for (let i = 0; i < 4; i++) {
            const mapDay = {}
            for (let j = 0; j < 7; j++) {
                if (getRandomInt(100) > 50)
                    continue;
                mapDay['' + j] = {
                    "startTime": getRandomInt(12),
                    "endTime": getRandomInt(12) + 12
                }
            }
            this.scheduleTemplate[i] = {
                numberWeek: i,
                objDays: mapDay
            }
        }
        console.log(this.schedule)
        console.log(this.scheduleTemplate)

        api.loadSchedule().then(value => {
            this.schedule = value.data

        console.log(this.schedule)
        })
    },
    methods: {
        weekNumber() {
            const currentdate = new Date();
            const oneJan = new Date(currentdate.getFullYear(), 0, 1);
            const numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
            return Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7) - 1
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
                               <h5> <b>Ваше расписание на год</b></h5>
                            </div>
                            <div class="col">
                                <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal"
                                        data-bs-target="#templateModel">
                                    <b>Заполнить через шаблон</b>
                                </button>

                                <div class="modal fade" id="templateModel" tabindex="-1" aria-labelledby="exampleModalLabel"
                                     aria-hidden="true">
                                    <div class="modal-dialog modal-xl">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Шаблон расписания</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">

                                                <div class="col text-center">
                                                    <div class="row row-cols-8 g-0">
                                                        <div class="col border border-1 p-1">Неделя</div>
                                                        <div class="col border border-1 p-1" v-for="dayData in headSchedule" :key="dayData">
                                                            <b>{{ dayData.text }}</b>
                                                        </div>
                                                    </div>
                                                    <div class="row row-cols-8 g-0" v-for="week in parsingScheduleTemplate" :key="week">
                                                        <div class="col border border-1 p-1">
                                                            <b>{{ week.numberWeek + 1 }}</b>
                                                        </div>
                                                        <div class="col border border-1 p-1 btn-cal"
                                                             :style="{'background': new Date().getDay() == index && weekNumber() === week.numberWeek ? 'rgba(24,182,24,0.7)' : ''}"
                                                             v-for="(dayData, index) in week.objDays" :key="dayData"
                                                             data-bs-toggle="tooltip" data-bs-placement="top"
                                                             :title="new Date(((week.numberWeek) * 7 + parseInt(index)) * 24 * 60 * 60 * 1000 + new Date(new Date().getFullYear(), 0, 1).getTime()).toLocaleDateString()">
                                                            <div class="w-100" v-if="dayData.endTime !== 0 && dayData.startTime !== 0">
                                                                {{ dayData.startTime }}:00-{{ dayData.endTime }}:00
                                                            </div>
                                                            <div class="w-100" v-if="!(dayData.endTime !== 0 && dayData.startTime !== 0)">
                                                                -
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                                    Закрыть
                                                </button>
                                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                                                    Отправить
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

            <div class="col text-center">
                <div class="row row-cols-8 g-0">
                    <div class="col border border-1 p-1">Неделя</div>
                    <div class="col border border-1 p-1" v-for="dayData in headSchedule" :key="dayData">
                        <b>{{ dayData.text }}</b>
                    </div>
                </div>
                <div class="row row-cols-8 g-0" v-for="week in parsingSchedule" :key="week">
                    <div class="col border border-1 p-1">
                        <b>{{ week.numberWeek + 1 }}</b>
                    </div>
                    <div class="col border border-1 p-1 btn-cal"
                         :style="{'background': new Date().getDay() == index && weekNumber() === week.numberWeek ? 'rgba(24,182,24,0.7)' : ''}"
                         v-for="(dayData, index) in week.objDays" :key="dayData"
                         data-bs-toggle="tooltip" data-bs-placement="top"
                         :title="new Date(((week.numberWeek) * 7 + parseInt(index)) * 24 * 60 * 60 * 1000 + new Date(new Date().getFullYear(), 0, 1).getTime()).toLocaleDateString()">
                        <div class="w-100" v-if="dayData.endTime !== 0 && dayData.startTime !== 0">
                            {{ dayData.startTime }}:00-{{ dayData.endTime }}:00
                        </div>
                        <div class="w-100" v-if="!(dayData.endTime !== 0 && dayData.startTime !== 0)">
                            -
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn-cal {
    background: #fff;
}

.btn-cal:hover {
    background: #ddd;
}
</style>