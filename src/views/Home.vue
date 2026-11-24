<template>
  <div class="home">
    <h2>{{ greetText }}</h2>
    <p>积分：{{ userInfo.points }}｜剩余抽奖次数：{{ userInfo.remain_draw }}</p>
    <div class="link-list">
      <button @click="$router.push('/lottery')">🎰 转盘抽奖</button>
      <button @click="$router.push('/game')">🧩 小游戏</button>
      <button @click="$router.push('/card')">🖼️ AI卡片</button>
      <button @click="$router.push('/wish')">💌 心愿墙</button>
      <button @click="$router.push('/admin')">🔧 后台管理</button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const userInfo = ref({})
const greetText = ref('')

onMounted(()=>{
  const hour = new Date().getHours()
  if(hour < 12) greetText.value = '早安'
  else if(hour <18) greetText.value = '午安'
  else greetText.value = '晚安'
  const u = JSON.parse(localStorage.getItem('user'))
  userInfo.value = u
})
</script>
