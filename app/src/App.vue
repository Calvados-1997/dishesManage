<script setup lang="ts">
import Toast from 'typescript-toastify'
import { ref, watch } from 'vue'
import DishButton from './components/DishButton.vue'
import DishInput from './components/DishInput.vue'
import { MENU_PRICE_115, MENU_PRICE_120, MENU_PRICE_130, MENU_PRICE_150 } from './const/menu_price'

const total = ref<number>(0)
const dishCntMap = new Map<number, number>()
const minPrice = ref<string | undefined>(undefined)
const dishPrices = ref<number[] | undefined>(undefined)
const customPrice = ref(undefined)

function initDishCntMapping(prices: number[]) {
  for (const p of prices) {
    dishCntMap.set(p, 0)
  }
}

function addDishCount(price: number) {
  const prvCnt: number = dishCntMap.get(price) ?? 0
  dishCntMap.set(price, prvCnt + 1)
}

function addTotal(price: number) {
  total.value += price
}

function clearTotal() {
  total.value = 0
  // 皿の枚数カウントを初期化
  initDishCntMapping(dishPrices.value!)
}

function addCustomDishCount(value: unknown) {
  const price = Number(value)
  if (Number.isNaN(price)) {
    // 数値変換に失敗した場合
    new Toast({
      position: 'top-center',
      toastMsg: '値段は数値で入力してください。',
      autoCloseTime: 3000,
      canClose: true,
      showProgress: false,
      type: 'error',
      theme: 'light',
    })
  } else {
    dishPrices.value?.push(price)
    dishCntMap.set(price, 1)
    total.value += price
    new Toast({
      position: 'top-center',
      toastMsg: '追加に成功しました。',
      autoCloseTime: 3000,
      canClose: true,
      showProgress: false,
      type: 'success',
      theme: 'light',
    })
  }
}

function clearCustomDishCount() {
  customPrice.value = undefined
}

watch(minPrice, (selectedPrice) => {
  switch (selectedPrice) {
    case '115':
      initDishCntMapping(MENU_PRICE_115)
      dishPrices.value = MENU_PRICE_115
      break
    case '120':
      initDishCntMapping(MENU_PRICE_120)
      dishPrices.value = MENU_PRICE_120
      break
    case '130':
      initDishCntMapping(MENU_PRICE_130)
      dishPrices.value = MENU_PRICE_130
      break
    case '150':
      initDishCntMapping(MENU_PRICE_150)
      dishPrices.value = MENU_PRICE_150
      break
    default:
      console.error(
        `
        [エラー]
        入力された選択肢が想定している値と一致しません。
        data: ${selectedPrice}
        data_type: ${typeof selectedPrice}
        `,
      )
      break
  }
})
</script>

<template>
  <div class="main-content">
    <div v-if="!minPrice">
      <p>1皿の値段を選択してください</p>
      <div class="price-select-area flex">
        <select class="border" v-model="minPrice" placeholder="1皿の値段を選択してください">
          <option>115</option>
          <option>120</option>
          <option>130</option>
          <option>150</option>
        </select>
      </div>
    </div>
    <div v-if="minPrice" class="total-area flex justify-between">
      <p>1皿{{ minPrice }}円〜</p>
      <p class="text-xl font-bold">合計：{{ total }}円</p>
    </div>

    <div class="dish-price-area h-60 overflow-y-auto flex flex-wrap px-2 my-2 gap-3 justify-center">
      <div class="" v-for="price in dishPrices" :key="price">
        <DishButton
          @click="(addTotal(price), addDishCount(price))"
          class="rounded-t-lg border-b-6"
          :title="`${price}円`"
          :font-size="'16px'"
        />
      </div>
    </div>
    <div v-if="minPrice" class="explainaion-area flex justify-end">
      <p class="text-xs m-1">※価格は税込</p>
    </div>
    <div v-if="minPrice" class="user-input-area flex gap-1 my-2">
      <DishInput v-model:input="customPrice" :placeholder="'値段(税込)'" />
      <DishButton @click="addCustomDishCount(customPrice)" :title="'追加'" :font-size="'16px'" />
      <DishButton @click="clearCustomDishCount()" :title="'クリア'" :font-size="'16px'" />
    </div>
    <div v-if="minPrice" class="summary-area border px-2 flex flex-col gap-3 h-80 overflow-y-auto">
      <div v-for="price in dishPrices" :key="price">
        <p>{{ price }}円の皿：{{ dishCntMap.get(price) }}枚</p>
      </div>
    </div>
    <div v-if="minPrice" class="reset-area my-4">
      <DishButton @click="clearTotal()" :title="'すべての計算をクリア'" :font-size="'14px'" />
    </div>
  </div>
</template>

<style scoped></style>
