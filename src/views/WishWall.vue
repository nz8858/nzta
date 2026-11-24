<template>
  <div>
    <h2>心愿墙</h2>
    <textarea v-model="content"></textarea>
    <div>
      <label><input type="radio" v-model="subType" value="private">仅主播可见</label>
      <label><input type="radio" v-model="subType" value="public">申请上墙</label>
    </div>
    <button @click="submit">提交心愿</button>
    <button @click="$router.push('/home')">返回主页</button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase'
const content = ref('')
const subType = ref('private')
const submit = async ()=>{
  const u = JSON.parse(localStorage.getItem('user'))
  await supabase.from('wish_messages').insert({
    user_id: u.id,
    content: content.value,
    submit_type: subType.value
  })
  alert('提交成功')
}
</script>
