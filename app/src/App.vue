<script setup lang="ts">
import Toast from 'typescript-toastify'
import { ref, watch } from 'vue'
import DishButton from './components/DishButton.vue'
import DishInput from './components/DishInput.vue'
import { MENU_PRICE_115, MENU_PRICE_120, MENU_PRICE_130, MENU_PRICE_150 } from './const/menu_price'

const totalPrice = ref<number>(0)
const dishCntMap = new Map<number, number>()
const minPrice = ref<string | undefined>(undefined)
const pricesPreset = ref<number[] | undefined>(undefined)
const customPrice = ref(undefined)

function initDishCntMapping(prices: number[]) {
  for (const p of prices) {
    dishCntMap.set(p, 0)
  }
}

watch(minPrice, (selectedPrice) => {
  if (selectedPrice === undefined) {
    return
  }
  switch (selectedPrice) {
    case '115':
      initDishCntMapping(MENU_PRICE_115)
      pricesPreset.value = [...MENU_PRICE_115]
      break
    case '120':
      initDishCntMapping(MENU_PRICE_120)
      pricesPreset.value = [...MENU_PRICE_120]
      break
    case '130':
      initDishCntMapping(MENU_PRICE_130)
      pricesPreset.value = [...MENU_PRICE_130]
      break
    case '150':
      initDishCntMapping(MENU_PRICE_150)
      pricesPreset.value = [...MENU_PRICE_150]
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

function addDishCount(price: number) {
  const prvCnt: number = dishCntMap.get(price) ?? 0
  dishCntMap.set(price, prvCnt + 1)
}

function addTotal(price: number) {
  totalPrice.value += price
}

function clearTotalPrice() {
  totalPrice.value = 0
}

function addCustomDishCount(value: unknown) {
  if (value === undefined) {
    return
  }

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
    return
  }

  const samePricefound = pricesPreset.value?.find((element) => element === price)
  if (samePricefound !== undefined) {
    new Toast({
      position: 'top-center',
      toastMsg: '既に追加されている値段です。',
      autoCloseTime: 3000,
      canClose: true,
      showProgress: false,
      type: 'error',
      theme: 'light',
    })
    return
  }

  pricesPreset.value?.push(price)
  pricesPreset.value?.sort((a, b) => a - b)
  dishCntMap.set(price, 1)
  totalPrice.value += price
  clearCustomDishCount()

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

function clearCustomDishCount() {
  customPrice.value = undefined
}

function clearAll() {
  totalPrice.value = 0
  dishCntMap.clear()
  minPrice.value = undefined
  pricesPreset.value = undefined
  customPrice.value = undefined
}
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
    <div v-else>
      <header class="total-area border-b border-slate-300 flex justify-between">
        <p>1皿{{ minPrice }}円〜</p>
        <p class="text-xl">2枚</p>
        <p class="text-xl font-bold">合計：{{ totalPrice }}円</p>
      </header>

      <div
        class="dish-price-area h-60 overflow-y-auto flex flex-wrap px-2 mt-4 gap-3 justify-center"
      >
        <div class="" v-for="price in pricesPreset" :key="price">
          <DishButton
            @click="(addTotal(price), addDishCount(price))"
            class="rounded-t-lg border-b-6"
            :title="`${price}円`"
            :font-size="'16px'"
          />
        </div>
      </div>
      <div class="explainaion-area flex justify-end">
        <p class="text-xs m-1">※価格は税込</p>
      </div>
      <div v-if="minPrice" class="user-input-area flex gap-1 my-2">
        <DishInput v-model:input="customPrice" :placeholder="'値段(税込)'" />
        <DishButton
          class="bg-black"
          @click="addCustomDishCount(customPrice)"
          :title="'追加'"
          :font-size="'16px'"
          color="white"
        />
        <DishButton @click="clearCustomDishCount()" :title="'入力クリア'" :font-size="'14px'" />
      </div>
      <div class="summary-area border px-2 flex flex-col gap-3 h-80 overflow-y-auto">
        <div v-for="price in pricesPreset" :key="price">
          <p>{{ price }}円の皿：{{ dishCntMap.get(price) }}枚</p>
        </div>
      </div>
      <div class="reset-area my-4">
        <DishButton
          @click="(clearTotalPrice(), initDishCntMapping(pricesPreset ?? []))"
          :title="'すべての計算をクリア'"
          :font-size="'14px'"
        />
      </div>
      <div>
        <DishButton
          @click="clearAll()"
          :title="'1皿の値段選択に戻る'"
          :font-size="'13px'"
          :color="'gray'"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  transition:
    transform 100ms ease,
    opacity 100ms ease,
    box-shadow 100ms ease;
  -webkit-tap-highlight-color: transparent; /* モバイルの青ハイライトを消す */
  touch-action: manipulation; /* タップ応答性を改善 */
}
button:active {
  transform: scale(0.96) translateY(1px);
  opacity: 0.9;
  box-shadow: none;
}
/* キーボード/アクセシビリティ用のフォーカスリング */
button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.45); /* sky-400相当 */
}
.price-select-area > select option {
  font-size: 17px;
}
</style>
