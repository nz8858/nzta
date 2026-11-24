<template>
  <div class="wheel-wrap">
    <div :style="wheelStyle" class="wheel"></div>
    <div class="btn-group">
      <button @click="startRotate" :disabled="rotating">开始</button>
      <button @click="stopRotate" :disabled="!rotating">停止</button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
const props = defineProps(['prizeList'])
const emit = defineEmits(['result'])
const rotating = ref(false)
const deg = ref(0)
let timer = null

const wheelStyle = computed(()=>{
  return {
    transform: `rotate(${deg.value}deg)`,
    transition: rotating.value ? 'none' : 'all 4s cubic-bezier(0.2,0.8,0.2,1)'
  }
})

const startRotate = () => {
  rotating.value = true
  timer = setInterval(()=>{
    deg.value += 8
  },30)
}
const stopRotate = () => {
  if(!rotating.value) return
  clearInterval(timer)
  rotating.value = false
  emit('result')
}
</script>
