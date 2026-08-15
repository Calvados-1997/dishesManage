<script setup lang="ts">
import Toast from 'typescript-toastify'
import { onBeforeMount, ref} from 'vue'
import DishButton from '@/components/DishButton.vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import type { StandardPrice } from '@/types/price'
import { PRICEMAP } from '@/consts/price'
import { useDishCounter } from '@/composables/useDishCounter'
import DishInputNumber from '@/components/DishInputNumber.vue'

const route = useRoute()
const dc = useDishCounter()
const pricePresets = ref<number[]>()
const stdPrice = ref<StandardPrice>()
const customPrice = ref<number>()

onBeforeMount(() => {
    // 画面に表示する各お皿をカウントするためのマップを初期化
    stdPrice.value = route.params.stdPrice as StandardPrice
    const presets = PRICEMAP[stdPrice.value] || []
    pricePresets.value = presets
    dc.initCountMap(presets)
})

const addCustomDishCount = (insertPrice?: number) => {
  if (!insertPrice) {
    return
  }

  if(dc.exsistPrice(insertPrice)){
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

  pricePresets.value?.push(insertPrice)
  pricePresets.value?.sort((a, b) => a - b)
  dc.addCustomPriceCount(insertPrice)
  dc.addTotal(insertPrice)
  dc.addTotalDishCount()
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
  customPrice.value = undefined
}

function clearCustomDishCount() {
  customPrice.value = undefined
}

const addCount = (price: number) => {
  dc.addDishCount(price)
  dc.addTotalDishCount()
  dc.addTotal(price)
}

const resetAllCount = () => {
  dc.resetDishCount()
  dc.resetTotalDishCount()
  dc.resetTotal()
}

const toHome = () => {
  router.push({name: 'home'})
}
</script>

<template>
    <div class="main-content">
    <div>
      <header class="total-area border-b border-slate-300 flex justify-between">
        <p>1皿{{ stdPrice }}円〜</p>
        <p class="text-xl">{{ dc.totalDishCount }}枚</p>
        <p class="text-xl font-bold">合計：{{ dc.totalPrice }}円</p>
      </header>

      <div
        class="dish-price-area h-60 overflow-y-auto flex flex-wrap px-2 mt-4 gap-3 justify-center"
      >
        <div class="" v-for="price in pricePresets" :key="price">
          <DishButton
            @click="addCount(price)"
            class="rounded-t-lg border-b-6 text-base"
            :title="`${price}円`"
          />
        </div>
      </div>
      <div class="explainaion-area flex justify-end">
        <p class="text-xs m-1">※価格は税込</p>
      </div>
      <div class="user-input-area flex gap-1 my-2">
        <DishInputNumber v-model="customPrice" :placeholder="'値段(税込)'" />
        <DishButton
          class="bg-black text-white text-base"
          @click="addCustomDishCount(customPrice)"
          :title="'追加'"
        />
        <DishButton @click="clearCustomDishCount()" :title="'入力クリア'" class="text-sm" />
      </div>
      <div class="summary-area border px-2 flex flex-col gap-3 h-80 overflow-y-auto">
        <div v-for="price in pricePresets" :key="price">
          <p>{{ price }}円の皿：{{ dc.dishCountMap.get(price) }}枚</p>
        </div>
      </div>
      <div class="reset-area my-4">
        <DishButton
          class="t bg-red-400 border-0 text-sm"
          @click="resetAllCount()"
          :title="'すべての計算をクリア'"
        />
      </div>
      <div>
        <DishButton @click="toHome()" :title="'1皿の値段選択に戻る'" class="text-sm" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>