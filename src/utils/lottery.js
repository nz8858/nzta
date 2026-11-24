export function getPrizeByWeight(prizeList) {
  const available = prizeList.filter(item=>item.enable && item.stock > 0)
  if(available.length ===0) return null
  let total = available.reduce((sum,item)=>sum + Number(item.weight),0)
  let random = Math.random() * total
  for(let item of available) {
    random -= Number(item.weight)
    if(random <= 0) return item
  }
  return available[0]
}
