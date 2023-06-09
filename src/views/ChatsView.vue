<script>
import {defineComponent} from 'vue'
import profileUser from "@/mixins/profileUser";
import orders from "@/mixins/orders";

export default defineComponent({
    name: "ChatsView",
    data() {
        return {
            chats: [
                {
                    "topic": "string",
                    "status": "CREATED",
                    "createTime": new Date(),
                    "lastModifiedTime": new Date(),
                    "createUser": {
                        "id": 0,
                        "phoneNumber": "stringpn",
                        "email": "string",
                        "name": "string",
                        "surname": "string",
                        "userRole": "CUSTOMER",
                    },
                    "messages": [
                        {
                            "id": 0,
                            "time": new Date(),
                            "text": "string",
                            "user": "string",
                            "chat": "string"
                        }
                    ]
                },
                {
                    "topic": "Отмена заказа с ошибкой",
                    "status": "CREATED",
                    "createTime": new Date(),
                    "lastModifiedTime": new Date(),
                    "createUser": {
                        "id": 0,
                        "phoneNumber": "+94302",
                        "email": "user@mail.ru",
                        "name": "Василий",
                        "surname": "Огурцов",
                        "userRole": "CUSTOMER",
                    },
                    "messages": [
                        {
                            "id": 0,
                            "time": new Date(),
                            "text": "Хочу отменить, но ошибка",
                            "user": "string",
                            "chat": "string"
                        }
                    ]
                }
            ]
        }
    },
    mixins: [profileUser],
    mounted() {
        if (!this.isLogin)
            this.$router.push('/')
    },
})
</script>

<template>
    <div class="container p-2">
        <div class="row row-cols-1 g-2">
            <div class="col">
                <div class="row row-cols-1 g-2">
                    <div class="col">
                        <div class="card">
                            <div class="card-header">
                                <div class="row row-cols-2">
                                    <div class="col d-flex align-items-center justify-content-start">
                                        <h5><b>Чаты</b></h5>
                                    </div>
                                    <div class="col">
                                        <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal"
                                                data-bs-target="#templateModel">
                                            <b>Создать чат</b>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="row row-cols-2 g-2">

                    <div class="col" v-for="chat in chats">
                        <div class="card">
                            <dic class="card-header">
                                <b>Тема:</b> {{ chat.topic }}
                            </dic>
                            <div class="card-body">
                                <div class="row row-cols-2 g-2">
                                    <div class="col">
                                        Статус:
                                    </div>
                                    <div class="col">
                                        {{ chat.status }}
                                    </div>
                                    <div class="col">
                                        Изменения в чате:
                                    </div>
                                    <div class="col">
                                        {{ chat.lastModifiedTime.toLocaleString() }}
                                    </div>


                                    <div class="col">
                                        Пользователь
                                    </div>
                                    <div class="col">
                                        {{ chat.createUser.name }} {{ chat.createUser.surname }}
                                    </div>
                                    <div class="col">
                                        Контактные данные
                                    </div>
                                    <div class="col">
                                        {{ chat.createUser.email }}, {{ chat.createUser.phoneNumber }}
                                    </div>

                                </div>
                            </div>
                            <div class="card-footer" style="background: rgba(0,0,0,.01)">
                                Последнее сообщение:
                            </div>
                            <div class="card-body">
                                <div class="row row-cols-1 g-2">
                                    <div class="col">
                                        {{ chat.messages[0].text }}
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="row">
                                    <div class="col">
                                        Создано
                                    </div>
                                    <div class="col text-end">
                                        {{ chat.createTime.toLocaleString() }}
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="row">
                                    <div class="col">
                                        <button class="btn btn-success w-100">
                                            Открыть диалог
                                        </button>
                                    </div>
                                    <div class="col">
                                        <button class="btn btn-success w-100">
                                            Сменить статус
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
</template>

<style scoped>

</style>