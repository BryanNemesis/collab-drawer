<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{ modelValue: string, color: string }>()

const emit = defineEmits(['update:modelValue'])

const canvas = ref<HTMLCanvasElement | null>(null)
const isDrawing = ref(false)

let lastX = 0
let lastY = 0

const startDrawing = (event: MouseEvent) => {
  isDrawing.value = true
  lastX = event.clientX - (canvas.value?.offsetLeft || 0)
  lastY = event.clientY - (canvas.value?.offsetTop || 0)
}

const draw = (event: MouseEvent) => {
  if (!isDrawing.value) return
  const x = event.clientX - (canvas.value?.offsetLeft || 0)
  const y = event.clientY - (canvas.value?.offsetTop || 0)

  const context = canvas.value?.getContext('2d')
  context?.beginPath()
  context?.moveTo(lastX, lastY)
  context?.lineTo(x, y)
  context?.stroke()

  lastX = x
  lastY = y
}

const stopDrawing = () => {
  isDrawing.value = false
  emit('update:modelValue', canvas.value?.toDataURL())
}

onMounted(() => {
  const canvasElement = canvas.value
  const context = canvasElement?.getContext('2d')
  if (context) {
    context.lineWidth = 1
    context.lineJoin = 'round'
    context.lineCap = 'round'
    context.strokeStyle = props.color
  }
})
</script>

<template>
  <canvas
    ref="canvas"
    class="canvas"
    width="600"
    height="300"
    @mousedown="startDrawing"
    @mousemove="draw"
    @mouseup="stopDrawing"
  ></canvas>
</template>

<style scoped>
.canvas {
  position: fixed;
}
</style>