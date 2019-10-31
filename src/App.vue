<template>
  <div>
    <comp-header/>
    <router-view/>
  </div>
</template>


<script>
  import compHeader from './components/Header/Header.vue';

  export default {
    components:{
      compHeader
    }
  }
</script>


<style>
  @import './assets/style.css';

</style>