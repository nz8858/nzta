<template>
  <div>
    <h2>AI卡片生成</h2>
    <select v-model="type">
      <option value="sister">姐妹卡</option>
      <option value="name">冠名卡</option>
      <option value="lover">情侣卡</option>
    </select>
    <input v-model="text" placeholder="输入文案" />
    <button @click="gen">生成卡片</button>
    <button @click="$router.push('/home')">返回主页</button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase'
const type = ref('sister')
const text = ref('')
const gen = async ()=>{
  await supabase.from('card_records').insert({
    user_id: JSON.parse(localStorage.getItem('user')).id,
    template_type: type.value,
    input_text: text.value
  })
  alert('卡片记录已保存（骨架版，图片生成后续接入）')
}
</script>
