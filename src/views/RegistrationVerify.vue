<script>
import {defineComponent} from 'vue'
import api from "@/api/api";

export default defineComponent({
    name: "RegistrationVerify",
    data(){
        return {
            error: '',
        }
    },
    mounted() {
        console.log(this.$route.query.t)
        api.registrationActive(this.$route.query.t)
            .then(value => {
                this.$router.push('/')
            })
            .catch(reason => {
                this.error = reason;
            })
    }
})
</script>

<template>
  <div class="container p-2" v-if="error">
      <div class="row">
          <div class="col">
              <div class="card">
                  <div class="card-body">
                      Ошибка подверждения: {{error}}
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<style scoped>

</style>