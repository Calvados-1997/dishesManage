import { ref, reactive } from 'vue'

export function useDishCalculator() {
  const totalPrice = ref(0)
  const totalDishCount = ref(0)
  const dishCntMap = reactive(new Map<number, number>())

  // カウントアップ
  function addDish(price: number) {
    totalPrice.value += price
    totalDishCount.value++
    const current = dishCntMap.get(price) ?? 0
    dishCntMap.set(price, current + 1)
  }

  // リセット
  function clearAll() {
    totalPrice.value = 0
    totalDishCount.value = 0
    dishCntMap.clear()
  }

  // 合計、皿カウントをリセット
  function clearTotal() {
    totalPrice.value = 0
    totalDishCount.value = 0
  }

  // 初期化
  function initDishCountMap(prices: number[]) {
    dishCntMap.clear()
    prices.forEach((p) => dishCntMap.set(p, 0))
  }

  return {
    totalPrice,
    totalDishCount,
    dishCntMap,
    addDish,
    clearAll,
    initDishCountMap,
    clearTotal,
  }
}
