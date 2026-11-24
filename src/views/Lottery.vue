<template>
  <div>
    <Wheel :prizeList="prizeList" @result="onResult" />
    <p>剩余次数：{{user.remain_draw}}</p>
    <p>{{tip}}</p>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Wheel from '@/components/Wheel.vue'
import { getPrizeByWeight } from '@/utils/lottery'
import { supabase } from '@/supabase'
const user = ref(JSON.parse(localStorage.getItem('user')))
const prizeList = ref([])
const tip = ref('')

onMounted(async ()=>{
  const {data} = await supabase.from('admin_setting').select('setting_value').eq('setting_key','prize_config').single()
  if(data) prizeList.value = data.setting_value
})

const onResult = async ()=>{
  if(user.value.remain_draw <= 0) {
    tip.value = '次数不足'
    return
  }
  const hit = getPrizeByWeight(prizeList.value)
  if(!hit) {
    tip.value = '奖品已抽完'
    return
  }
  tip.value = `恭喜抽到：${hit.name}`
  await supabase.from('lottery_records').insert({user_id:user.value.id, prize_name:hit.name})
  await supabase.from('users').update({remain_draw: user.value.remain_draw - 1}).eq('id',user.value.id)
}
</script>
