<script setup lang="ts">
import { v4 } from 'uuid'
import Canvas from './Canvas.vue'
import SomeonesImage from './SomeonesImage.vue'
import { onUnmounted, ref, watchEffect } from 'vue'
import { updateUserPictureData, getOtherPicturesData } from '../services/pictureDataService'

const userId = v4()
const color = '#' + Math.floor(Math.random() * 16777215).toString(16)

const pictureData = ref<string>('')
const otherPicturesData = ref<string[]>([])

watchEffect(async () => {
  updateUserPictureData(pictureData.value, userId)

  otherPicturesData.value = await getOtherPicturesData(userId)
})

onUnmounted(async () => {
  updateUserPictureData('', userId)
})
</script>

<template>
  <SomeonesImage v-for="picture in otherPicturesData" :imgUrl="picture"></SomeonesImage>
  <Canvas v-model="pictureData" :color="color"></Canvas>
</template>

<style scoped>
canvas {
  border: 1px solid #000;
  width: 600px;
}
</style>
