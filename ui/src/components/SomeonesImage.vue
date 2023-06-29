<script setup lang="ts">
defineProps<{imgUrl: string}>()
</script>

<template>
    <img :src="imgUrl" class="someones-image">
</template>

<style scoped>
.someones-image {
    position: fixed;
}
</style>