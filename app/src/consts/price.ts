import type { StandardPrice } from "@/types/price"

const MENU_PRICE_115: number[] = [115, 120, 130, 140, 150, 160, 180, 200, 250, 270, 300, 380]
const MENU_PRICE_120: number[] = [120, 130, 150, 170, 190, 210, 240, 270, 280, 390]
const MENU_PRICE_130: number[] = [130, 140, 160, 180, 200, 220, 250, 280, 290, 420]
const MENU_PRICE_150: number[] = [150, 170, 190, 210, 230, 260, 300, 430]
const STANDARD_PRICES_OPTIONS = ['115', '120', '130', '150'] as const
const PRICEMAP: Record<StandardPrice, number[]> = {
    '115': MENU_PRICE_115,
    '120': MENU_PRICE_120,
    '130': MENU_PRICE_130,
    '150': MENU_PRICE_150
}

export {
    MENU_PRICE_115,
    MENU_PRICE_120,
    MENU_PRICE_130,
    MENU_PRICE_150,
    STANDARD_PRICES_OPTIONS,
    PRICEMAP
}