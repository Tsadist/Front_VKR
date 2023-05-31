<template>
    <div class="container">
        <nav class="nav nav-pills nav-justified border-bottom border-2 border-primary">
            <router-link class="nav-link" :class="{active: this.$route.name === 'home'}" aria-current="page" to="/">Личный кабинет</router-link>
            <router-link class="nav-link" :class="{active: this.$route.name === 'orders'}" to="#">Заказы</router-link>
            <router-link class="nav-link" :class="{active: this.$route.name === 'chats'}" to="#">Чаты</router-link>
            <router-link class="nav-link" :class="{active: this.$route.name === 'about'}" to="/about">О проекте</router-link>
        </nav>
        <router-view/>
    </div>
</template>

<style>
</style>
<script setup>

</script>