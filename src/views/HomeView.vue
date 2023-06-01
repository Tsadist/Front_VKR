<template>
  <div class="container p-3">

      <div class="container">
          <div class="row justify-content-center p-5">
              <LoginComponent class="col col-lg-6 "/>
          </div>
      </div>
  </div>
</template>

<script>


import LoginComponent from "@/components/LoginComponent.vue";

export default {
  name: 'HomeView',
  components: {
      LoginComponent
  }
}
</script>
