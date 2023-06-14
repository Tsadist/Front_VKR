<script>
import {defineComponent} from 'vue'
import profileUser from "@/mixins/profileUser";
import orders from "@/mixins/orders";
import api from "@/api/api";

export default defineComponent({
    name: "ChatsView",
    data() {
        return {
            newChatTopic: '',
            newMessageText: '',
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
                            "chat": "string",
                            "name": "Василий",
                            "surname": "Пупкин",
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
                    "messages": []
                }
            ]
        }
    },
    mixins: [profileUser],
    mounted() {
        if (!this.isLogin)
            this.$router.push('/')
        this.updateAll()
    },
    methods: {
        updateAll(){
            api.loadChats(this.newChatTopic).then(value => {
                this.chats = value.data
                for (let i = 0; i < this.chats.length; i++) {
                    api.loadMessages(this.chats[i].chatId)
                        .then(value1 => {
                            this.chats[i].messages = value1.data
                        })
                }
            })
        },
        createTopic(){
            api.createChat(this.newChatTopic).then(value => this.updateAll())
            this.newChatTopic = ''
        },
        sendMessage(chatId){
            api.createMessage(chatId, this.newMessageText).then(value => this.updateAll())
            this.newMessageText = ''
        },
        isAuthorMessage(userId){
            return this.profile.id === userId
        }
    }
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
                                    <div class="col" v-if="isRoleOr(['CUSTOMER'])">
                                        <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal"
                                                data-bs-target="#createChat">
                                            <b>Создать чат</b>
                                        </button>
                                        <div class="modal fade" id="createChat" tabindex="-1" aria-labelledby="exampleModalLabel"
                                             aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLabel">Создание чата</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                                aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="row row-cols-1 g-2">
                                                            <div class="col">
                                                                <label for="chatName" class="form-label" >Заголовок чата</label>
                                                                <input type="email" class="form-control" id="chatName" placeholder="Какая-то пробелема?" v-model="newChatTopic">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                                            Закрыть
                                                        </button>
                                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="createTopic">
                                                            Создать
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
                                        Пользователь
                                    </div>
                                    <div class="col">
                                        {{ chat.name }} {{ chat.surname }}
                                    </div>
                                    <div class="col">
                                        Контактные данные
                                    </div>
                                    <div class="col">
                                        {{ chat.email }}, {{ chat.phoneNumber }}
                                    </div>

                                    <div class="col">
                                        Изменения в чате:
                                    </div>
                                    <div class="col">
                                        {{ new Date(chat.lastModifiedTime).toLocaleString() }}
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer" style="background: rgba(0,0,0,.01)">
                                Последнее сообщение:
                            </div>
                            <div class="card-body" v-if="chat.messages !== undefined && chat.messages.length !== 0">
                                <div class="row row-cols-1 g-2">
                                    <div class="col">
                                        {{ chat.messages[chat.messages.length - 1].text }}
                                    </div>
                                    <div class="col text-end" style="color: #a6a6a6">
                                        {{ chat.messages[chat.messages.length - 1].name }} {{ chat.messages[chat.messages.length - 1].surname }}
                                    </div>
                                </div>
                            </div>
                            <div class="card-body" v-else><div class="row row-cols-1 g-2">
                                <div class="col text-center" >
                                    <b>Нет сообщений</b>
                                </div>
                            </div>
                            </div>
                            <div class="card-footer">
                                <div class="row">
                                    <div class="col">
                                        Создано
                                    </div>
                                    <div class="col text-end">
                                        {{ new Date(chat.createTime).toLocaleString() }}
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="row">
                                    <div class="col">
                                        <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal"
                                                :data-bs-target="'#openChat' + chat.chatId">
                                            <b>Открыть чат</b>
                                        </button>
                                        <div class="modal fade" :id="'openChat' + chat.chatId" tabindex="-1" aria-labelledby="exampleModalLabel"
                                             aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLabel">{{ chat.topic}}</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                                aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="row row-cols-1 g-2 pb-3 position-relative">
                                                            <div class="col text-center" v-if="chat.messages === undefined || chat.messages.length === 0">
                                                                <b>Нет сообщений</b>
                                                            </div>

                                                            <div class="col" v-if="chat.messages !== undefined && chat.messages.length !== 0"
                                                            v-for="message in chat.messages" :key="message" :class="{'d-flex justify-content-end': isAuthorMessage(message.userId)}">
                                                                <div class="border border-1 w-75 rounded-3 px-3 py-1">

                                                                    <div class="row row-cols-2 g-1">
                                                                        <div class="col" style="color: #a6a6a6" v-if="isAuthorMessage(message.userId)">
                                                                            Вы
                                                                        </div>
                                                                        <div class="col" style="color: #a6a6a6" v-else>
                                                                            {{ message.name }} {{ message.surname }}
                                                                        </div>
                                                                        <div class="col text-end" style="color: #bdbdbd">
                                                                            {{ new Date(message.time).toLocaleString() }}
                                                                        </div>
                                                                        <div class="col ps-2 col-12">
                                                                            {{ message.text }}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row row-cols-1 g-2">
                                                            <div class="col">
                                                                <input type="email" class="form-control" id="chatName" placeholder="Новое сообщение" v-model="newMessageText">
                                                            </div>
                                                            <div class="col">
                                                                <button type="button" class="btn btn-success w-100" @click="sendMessage(chat.chatId)">
                                                                    Отправить
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                                            Закрыть
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <button class="btn btn-success w-100" v-if="!isRoleOr(['CUSTOMER'])">
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