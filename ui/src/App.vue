<script setup lang="ts">
import DrawingArea from './components/DrawingArea.vue'
</script>

<template>
  <header></header>

  <main>
    <DrawingArea />
  </main>
</template>

<style scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
