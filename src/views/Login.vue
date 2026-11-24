<template>
  <div class="login">
    <h2>老客户专属入口</h2>
    <input v-model="passCode" placeholder="请输入专属口令" />
    <button @click="handleLogin">进入</button>
    <p>{{ msg }}</p>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase'
import { useRouter } from 'vue-router'
const router = useRouter()
const passCode = ref('')
const msg = ref('')

const handleLogin = async () => {
  msg.value = ''
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('unique_pass', passCode.value)
    .eq('is_active', true)
    .single()
  if(error) {
    msg.value = '口令错误，无法进入'
    return
  }
  localStorage.setItem('user', JSON.stringify(data))
  router.push('/home')
}
</script>
