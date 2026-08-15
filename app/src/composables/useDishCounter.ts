import { reactive, ref } from "vue"

/**
 * Dish-counter composable
 */
export const useDishCounter = () => {
    const dishCountMap = reactive(new Map<number, number>())
    const totalPrice = ref<number>(0)
    const totalDishCount = ref<number>(0)

    /**
     * init dish-count counter.
     * 
     * reset state, set dish-counter map from arg.
     * @param prices array of number
     */
    const init = (prices: number[]) => {
        dishCountMap.clear()
        totalPrice.value = 0
        totalDishCount.value = 0

        // initialize key-pair map with zero count
        for (const p of prices) {
            dishCountMap.set(p, 0)
        }
    }

    const _addDishCountMap = (price: number) => {
        const prevCnt = dishCountMap.get(price) ?? 0
        dishCountMap.set(price, prevCnt + 1)
    }
    const _addTotalDishCount = () => {
        totalDishCount.value++
    }
    const _addTotalPrice = (price: number) => {
        totalPrice.value += price
    }
    /**
     * add dish count, totalDishCount, totalPrice
     * @param price number
     */
    const addCount = (price: number) => {
        _addDishCountMap(price)
        _addTotalDishCount()
        _addTotalPrice(price)
    }

    const _exsistPrice = (price: number) => {
        return dishCountMap.has(price)
    }
    /**
     * add custom price dish count.
     * 
     * return true if added successfully.
     * 
     * return false if price exsist already.
     * 
     * @param price number
     * @returns boolean
     */
    const addCustomPriceCount = (price: number) => {
        const alreadyExsist = _exsistPrice(price)
        if(alreadyExsist) return false

        addCount(price)
        return true
    }

    const _decreaseDishCount = (price: number) => {
        const currCnt = dishCountMap.get(price) || 0
        if(currCnt <= 0) return

        dishCountMap.set(price, currCnt-1)
    }
    const _decreaseTotalDishCount = () => {
        totalDishCount.value--
    }
    const _decreaseTotalPrice = (price: number) => {
        totalPrice.value -= price
    }
    /**
     * decrease count with specified price.
     * @param price number
     */
    const decreaseCount = (price: number) => {
        _decreaseDishCount(price)
        _decreaseTotalDishCount()
        _decreaseTotalPrice(price)
    }

    const _resetDishCountMap = () => {
        for (const key of dishCountMap.keys()){
            dishCountMap.set(key, 0)
        }
    }
    const _resetTotalDishCount = () => {
        totalDishCount.value = 0
    }
    const _resetTotalPrice = () => {
        totalPrice.value = 0
    }
    /**
     * reset all count.
     */
    const resetAllCount = () => {
        _resetDishCountMap()
        _resetTotalDishCount()
        _resetTotalPrice()
    }

    return { 
        dishCountMap,
        totalPrice,
        totalDishCount,
        init,
        addCount,
        addCustomPriceCount,
        decreaseCount,
        resetAllCount,
    }
}