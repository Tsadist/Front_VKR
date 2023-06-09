<script>
import {defineComponent} from 'vue'
import profileUser from "@/mixins/profileUser";
import orders from "@/mixins/orders";

export default defineComponent({
    name: "WorkersUserView",
    mixins: [profileUser],
    mounted() {
        if (!this.isLogin)
            this.$router.push('/')
    },
})
</script>

<template>

</template>

<style scoped>

</style>