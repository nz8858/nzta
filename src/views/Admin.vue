<template>
  <div>
    <h2>后台管理</h2>
    <div v-for="(item,idx) in prizeList" :key="idx">
      <p>奖品名称：<input v-model="item.name" /></p>
      <p>权重：<input v-model.number="item.weight" /></p>
      <p>库存：<input v-model.number="item.stock" /></p>
      <label><input type="checkbox" v-model="item.enable">启用</label>
    </div>
    <button @click="savePrize">保存奖品配置</button>
    <button @click="$router.push('/home')">返回主页</button>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
const prizeList = ref([])

onMounted(async ()=>{
  const {data} = await supabase.from('admin_setting').select('setting_value').eq('setting_key','prize_config').single()
  if(data) prizeList.value = data.setting_value
  else prizeList.value = [
    {name:'奖品A',weight:10,stock:10,enable:true},
    {name:'奖品B',weight:5,stock:5,enable:true}
  ]
})

const savePrize = async ()=>{
  await supabase.from('admin_setting').upsert({
    setting_key: 'prize_config',
    setting_value: prizeList.value
  })
  alert('奖品权重配置已保存，实时生效！')
}
</script>
