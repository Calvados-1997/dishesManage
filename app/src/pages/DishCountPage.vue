<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import DishButton from '@/components/DishButton.vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import type { StandardPrice } from '@/types/price'
import { PRICEMAP } from '@/consts/price'
import { useDishCounter } from '@/composables/useDishCounter'
import InputNumber from '@/components/InputNumber.vue'
import { toastBuilder } from '@/utils/toast'

const route = useRoute()
const dc = useDishCounter()
const stdPrice = ref<StandardPrice>()
const customPrice = ref<number>()

onBeforeMount(() => {
    stdPrice.value = route.params.stdPrice as StandardPrice
    const presets = PRICEMAP[stdPrice.value] || []
    dc.init(presets)
})

const displayPriceList = computed(() => {
  const priceList = Array.from(dc.dishCountMap.keys())
  return priceList.sort((a, b) => a - b)
})

const addCustomDishCount = (insertPrice?: number) => {
  if (!insertPrice) {
    toastBuilder()
      .setToastMsg('値段を入力してください。')
      .setType('error')
      .show()
    return
  }

  const isDupPrice = dc.addCustomPriceCount(insertPrice)
  if(!isDupPrice) {
    toastBuilder()
      .setToastMsg('既に追加されている値段です。')
      .setType('error')
      .show()
    return
  }

  toastBuilder()
      .setToastMsg('追加に成功しました。')
      .setType('success')
      .show()

  clearCustomDishCount()
}

function clearCustomDishCount() {
  customPrice.value = undefined
}

const addCount = (price: number) => {
  dc.addCount(price)
}

const decreaseCount = (price: number) => {
  if(dc.totalPrice.value > 0 && dc.totalDishCount.value > 0){
    dc.decreaseCount(price)
  }
}

const resetAllCount = () => {
  dc.resetAllCount()
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
        class="dish-price-area mt-3 grid justify-items-center-safe grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-2"
      >
        <div class="" v-for="price in displayPriceList" :key="price">
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
        <InputNumber v-model="customPrice" :placeholder="'値段(税込)'" />
        <DishButton
          class="bg-black text-white text-base"
          @click="addCustomDishCount(customPrice)"
          :title="'追加'"
        />
        <DishButton @click="clearCustomDishCount()" :title="'入力クリア'" class="text-sm" />
      </div>
      <div class="summary-area border px-2 py-1 flex flex-col gap-3 h-80 overflow-y-auto">
        <div v-for="price in displayPriceList" :key="price" class="flex items-center justify-between">
          <p>{{ price }}円の皿：{{ dc.dishCountMap.get(price) }}枚</p>
          <div class="flex gap-1">
            <DishButton @click="addCount(price)" :title="'＋'" class="text-sm" />
            <DishButton @click="decreaseCount(price)" :title="'ー'" class="text-sm text-red-400" :disabled="!dc.dishCountMap.get(price)" />
          </div>
        </div>
      </div>
      <div class="reset-area my-4">
        <DishButton
          class="bg-red-400 border-0 text-sm"
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