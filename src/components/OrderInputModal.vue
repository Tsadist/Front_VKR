<script>
import {defineComponent} from 'vue'
import {dicStatus} from "@/api/dictionary";

export default defineComponent({
    name: "OrderInputModal",
    computed: {
        dic() {
            return dicStatus
        }
    },
    props: {
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
                startTime: 11
            }
        },
        ok: {
            type: Function
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
                            <label for="dateInput" class="form-label">В который час</label>
                            <input v-model="data.startTime" id="dateInput" class="form-control"
                                   type="number" min="0" max="24">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="ok(data)">Отправить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>