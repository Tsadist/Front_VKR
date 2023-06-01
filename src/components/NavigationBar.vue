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
        <router-link class="nav-link" :class="{active: this.$route.name === 'order'}" to="/order" v-if="isLogin">Заказы</router-link>
        <router-link class="nav-link" :class="{active: this.$route.name === 'chat'}" to="/chat" v-if="isLogin">Чаты</router-link>
        <router-link class="nav-link" :class="{active: this.$route.name === 'about'}" to="/about">О проекте</router-link>
    </nav>
</template>

<style scoped>

</style>