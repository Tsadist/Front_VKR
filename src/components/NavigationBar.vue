<script>
import {defineComponent} from 'vue'
import profileUser from "@/mixins/profileUser";

export default defineComponent({
    name: "NavigationBar",
    mixins: [profileUser],
})
</script>

<template>
    <nav class="nav nav-pills nav-justified border-bottom border-2 border-primary">
        <router-link class="nav-link" :class="{active: this.$route.name === 'home'}" aria-current="page" to="/">Личный кабинет</router-link>
        <router-link class="nav-link" :class="{active: this.$route.name === 'order'}" to="/order" v-if="isLogin && isRoleOr(['CLEANER', 'CUSTOMER'])">Заказы</router-link>
        <router-link class="nav-link" :class="{active: this.$route.name === 'schedule'}" to="/schedule" v-if="isLogin && isRoleOr(['CLEANER'])">Расписание</router-link>
        <router-link class="nav-link" :class="{active: this.$route.name === 'workers'}" to="/workers" v-if="isLogin && isRoleOr(['MANAGER'])">Работники</router-link>
        <router-link class="nav-link" :class="{active: this.$route.name === 'applications'}" to="/applications" v-if="isLogin && isRoleOr(['MODERATOR'])">Заявки на отмену</router-link>
        <router-link class="nav-link" :class="{active: this.$route.name === 'chats'}" to="/chats" v-if="isLogin && isRoleOr(['CUSTOMER', 'MODERATOR'])">Чаты</router-link>
        <router-link class="nav-link" :class="{active: this.$route.name === 'about'}" to="/about">О проекте</router-link>
    </nav>
</template>

<style scoped>

</style>