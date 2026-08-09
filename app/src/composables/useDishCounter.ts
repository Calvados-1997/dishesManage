import { reactive, ref } from "vue"

// お皿枚数カウント処理
export const useDishCounter = () => {
    const dishCountMap = reactive(new Map<number, number>())
    const totalPrice = ref<number>(0)
    const totalDishCount = ref<number>(0)

    /** 指定した価格リストでカウントマップを0初期化する */
    const initCountMap = (prices: number[]) => {
        for (const p of prices) {
            dishCountMap.set(p, 0)
        }
    }
    /** 指定価格のカウントを1増やす */
    const addDishCount = (price: number) => {
        const prevCnt = dishCountMap.get(price) || 0
        dishCountMap.set(price, prevCnt+1)
    }
    /** 指定価格のカウントを1減らす（0未満にはならない） */
    const decreaseDishCount = (price: number) => {
        const currCnt = dishCountMap.get(price) || 0
        if(currCnt <= 0) return

        dishCountMap.set(price, currCnt-1)
    }
    /** 総枚数を1増やす */
    const addTotalDishCount = () => {
        totalDishCount.value++
    }
    /** 総枚数を1減らす */
    const decreaseTotalDishCount = () => {
        totalDishCount.value--
    }
    /** 総枚数を0にリセットする */
    const resetTotalDishCount = () => {
        totalDishCount.value = 0
    }
    /** 全価格のカウントを0にリセットする */
    const resetDishCount = () => {
        for (const key of dishCountMap.keys()){
            dishCountMap.set(key, 0)
        }
    }
    /** 合計金額に加算する */
    const addTotal = (price: number) => {
        totalPrice.value += price
    }
    /** 合計金額から減算する */
    const decreaseTotal = (price: number) => {
        totalPrice.value -= price
    }
    /** 合計金額を0にリセットする */
    const resetTotal = () => {
        totalPrice.value = 0
    }
    /** 価格マップに指定された値段が存在するかチェックする */
    const exsistPrice = (price: number) => {
        return dishCountMap.has(price)
    }
    /** カスタム価格をマップに追加する */
    const addCustomPriceCount = (price: number, initCount: number = 1) => {
        dishCountMap.set(price, initCount)
        return true
    }

    return { 
        dishCountMap,
        totalPrice,
        totalDishCount,
        initCountMap, 
        addDishCount, 
        decreaseDishCount,
        addTotal, 
        decreaseTotal,
        addTotalDishCount, 
        decreaseTotalDishCount,
        resetTotalDishCount,
        resetDishCount,
        resetTotal,
        exsistPrice,
        addCustomPriceCount
    }
}