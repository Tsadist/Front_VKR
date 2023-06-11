<script>
import {defineComponent} from 'vue'
import {dicStatus} from "@/api/dictionary";
import { nextTick } from 'vue';

export default defineComponent({
    name: "OrderInputModal",
    data(){
        return {
            renderComponent: true
        }
    },
    computed: {
        dic() {
            return dicStatus
        }
    },
    props: {
        additionalService: {
            type: Array,
            default: []
        },
        title: {
            type: String,
            default: "Пусто"
        },
        data: {
            type: Object,
            default: {
                area: 11,
                roomType: '',
                cleaningType: '',
                theDate: new Date(),
                startTime: 11,
                additionServicesId: []
            }
        },
        ok: {
            type: Function
        }
    },
    methods: {
        isClickAdditional(id) {
            for (let i = 0; i < this.data.additionServicesId.length; i++) {
                if (id === this.data.additionServicesId[i]) {
                    return true;
                }
            }
            return false;
        },
        getAdditionalData(id) {
            for (let i = 0; i < this.additionalService.length; i++) {
                if (this.additionalService[i].id === id)
                    return this.additionalService[i];
            }
            return {};
        },
        async selectAddition(id) {
            this.renderComponent = false;
            for (let i = 0; i < this.data.additionServicesId.length; i++) {
                if (id === this.data.additionServicesId[i]) {
                    this.data.additionServicesId.splice(i, 1);
                    await nextTick();
                    this.renderComponent = true;
                    return;
                }
            }
            console.log("=========================")
            this.data.additionServicesId.push(id)
            console.log(this.data)
            console.log(this.data.additionServicesId)
            console.log(this.additionalService)

            await nextTick();
            this.renderComponent = true;
        }
    }
})
</script>

<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row row-cols-1 g-2">
                        <div class="col">
                            <label for="areaInput" class="form-label">Площадь помещения:</label>
                            <input v-model="data.area" type="number" class="form-control" id="areaInput" step="0.1"
                                   min="10">
                        </div>
                        <div class="col">
                            <label for="addressInput" class="form-label">Адрес:</label>
                            <input v-model="data.address" type="text" class="form-control" id="addressInput"
                                   placeholder="Адрес места уборки">
                        </div>
                        <div class="col">
                            <label for="roomTypeInput" class="form-label">Тип помощения</label>
                            <select v-model="data.roomType" id="roomTypeInput" class="form-select">
                                <option disabled value="">Выберите один из вариантов</option>
                                <option v-for="type in dic.roomTypes" v-bind:value="type">
                                    {{ type.text }}
                                </option>
                            </select>
                        </div>
                        <div class="col">
                            <label for="cleaningTypeInput" class="form-label">Тип уборки</label>
                            <select v-model="data.cleaningType" id="cleaningTypeInput"
                                    class="form-select">
                                <option disabled value="">Выберите один из вариантов</option>
                                <option v-for="type in dic.cleaningTypes" v-bind:value="type">
                                    {{ type.text }}
                                </option>
                            </select>
                        </div>
                        <div class="col">
                            <label for="dateInput" class="form-label">Дата уборки</label>
                            <input v-model="data.theDate" id="dateInput" class="form-control"
                                   type="date">
                        </div>
                        <div class="col">
                            <label for="dateInput" class="form-label">В какое время</label>
                            <input v-model="data.startTime" id="dateInput" class="form-control"
                                   type="number" min="0" max="24">
                        </div>
                        <div class="col">
                            <div class="row row-cols-1 g-2">
                                <div class="col">
                                    Дополнительные услуги:
                                </div>
                                <div class="col">
                                    <div class="row">
                                        <div class="col" v-for="addit in additionalService" key="addit.id" v-bind="data" v-if="renderComponent">
                                            <div class="btn" :class="{'btn-success': isClickAdditional(addit.id),
                                            'btn-outline-success': !isClickAdditional(addit.id)}" @click="selectAddition(addit.id)">
                                                {{ addit.title }} / {{ addit.cost }}р
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Закрыть
                    </button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="ok(data)">
                        Отправить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>