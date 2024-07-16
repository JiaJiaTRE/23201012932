<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, watch } from 'vue';

const state=ref(true)

const route=useRoute()

watch(()=>route.meta.isTab,(newValue,oldValue)=>{
  console.log(newValue);
  
  if(newValue==false){
    state.value=false
  }
  if(oldValue==false){
    state.value=true
  }
})
</script>

<template>

  <RouterView />

  <!-- 下导航 -->
  <div class="footer" v-if="state">
    <Nav></Nav>
  </div>
</template>

<style scoped>
</style>