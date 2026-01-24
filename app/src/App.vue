<script setup lang="ts">
import Toast from 'typescript-toastify'
import { ref, watch } from 'vue'
import DishButton from './components/DishButton.vue'
import DishInput from './components/DishInput.vue'
import { MENU_PRICE_115, MENU_PRICE_120, MENU_PRICE_130, MENU_PRICE_150 } from './const/menu_price'
import { useDishCalculator } from './composables/useDishCalculator'

const { totalPrice, totalDishCount, dishCntMap, addDish, clearAll, clearTotal, initDishCountMap } =
  useDishCalculator()
const minPrice = ref<string | undefined>(undefined)
const pricesPreset = ref<number[] | undefined>(undefined)
const customPrice = ref(undefined)

const MENU_PRESETS: Record<string, number[]> = {
  '115': MENU_PRICE_115,
  '120': MENU_PRICE_120,
  '130': MENU_PRICE_130,
  '150': MENU_PRICE_150,
}

watch(minPrice, (selectedPrice) => {
  if (selectedPrice === undefined) return

  const preset = MENU_PRESETS[selectedPrice]
  if (preset) {
    pricesPreset.value = [...preset]
    initDishCountMap(preset)
  }
})

function addCustomDishCount(value: string) {
  if (value === '') {
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

  // 価格一覧に追加
  pricesPreset.value?.push(price)
  // 値段順に昇順ソート
  pricesPreset.value?.sort((a, b) => a - b)
  // 追加した皿カウントに1をセット
  dishCntMap.set(price, 1)
  totalPrice.value += price
  totalDishCount.value++
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
        <p class="text-xl">{{ totalDishCount }}枚</p>
        <p class="text-xl font-bold">合計：{{ totalPrice }}円</p>
      </header>

      <div
        class="dish-price-area h-60 overflow-y-auto flex flex-wrap px-2 mt-4 gap-3 justify-center"
      >
        <div class="" v-for="price in pricesPreset" :key="price">
          <DishButton
            @click="addDish(price)"
            class="rounded-t-lg border-b-6"
            :title="`${price}円`"
            :font-size="'16px'"
          />
        </div>
      </div>
      <div class="explainaion-area flex justify-end">
        <p class="text-xs m-1">※価格は税込</p>
      </div>
      <div>
        <DishButton
          class="t bg-red-400 border-0"
          @click="(clearTotal(), initDishCountMap(pricesPreset ?? []))"
          :title="'すべての計算をクリア'"
          :font-size="'14px'"
        />
      </div>
      <div v-if="minPrice" class="user-input-area flex gap-1 my-2">
        <DishInput v-model:input="customPrice" :placeholder="'値段(税込)'" />
        <DishButton
          class="bg-black"
          @click="addCustomDishCount(customPrice ?? '')"
          :title="'追加'"
          :font-size="'16px'"
          color="white"
        />
        <DishButton
          @click="clearCustomDishCount()"
          :title="'入力クリア'"
          :font-size="'13px'"
          color="gray"
        />
      </div>
      <div class="summary-area border px-2 flex flex-col gap-3 h-80 overflow-y-auto">
        <div v-for="price in pricesPreset" :key="price">
          <p>{{ price }}円の皿：{{ dishCntMap.get(price) }}枚</p>
        </div>
      </div>
      <div class="reset-area my-4"></div>
      <div>
        <DishButton
          @click="(clearAll(), (minPrice = undefined))"
          :title="'1皿の値段選択に戻る'"
          :font-size="'13px'"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.price-select-area > select option {
  font-size: 17px;
}
</style>
