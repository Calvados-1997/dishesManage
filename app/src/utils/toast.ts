import Toast from "typescript-toastify"
import type { Position, ToastType } from "typescript-toastify/lib/type/type"

/**
 * Toast builder class.
 * 
 * toast library used:
 * https://typescript-toastify.vercel.app/
 */
class ToastBuilder {
    private _position: Position
    private _toastMsg: string
    private _autoCloseTime: number
    private _canClose: boolean
    private _showProgress: boolean
    private _pauseOnHover: boolean
    private _pauseOnFocusLoss: boolean
    private _type: ToastType
    private _theme: 'dark' | 'light'

    constructor(){
        // set default
        this._position = 'top-center'
        this._toastMsg = 'toast'
        this._autoCloseTime = 3000
        this._canClose = true
        this._showProgress = false
        this._pauseOnHover = false
        this._pauseOnFocusLoss = false
        this._type = 'info'
        this._theme = 'light'
    }

    public setPosition(position: Position): this {
        this._position = position
        return this
    }

    public setToastMsg(msg: string): this {
        this._toastMsg = msg
        return this
    }

    public setAutoCloseTime(milseconds: number): this {
        this._autoCloseTime = milseconds
        return this
    }

    public setCanClose(canClose: boolean): this {
        this._canClose = canClose
        return this
    }

    public setShowProgress(showProgress: boolean): this {
        this._showProgress = showProgress
        return this
    }

    public setPauseOnHover(pauseOnHover: boolean): this {
        this._pauseOnHover = pauseOnHover
        return this
    }

    public setPauseOnFocusLoss(pauseOnFocusLoss: boolean): this {
        this._pauseOnFocusLoss = pauseOnFocusLoss
        return this
    }

    public setType(type: ToastType): this {
        this._type = type
        return this
    }

    public setTheme(theme: 'dark' | 'light'): this {
        this._theme = theme
        return this
    }

    public show(): Toast {
        return new Toast({
            position: this._position,
            toastMsg: this._toastMsg,
            autoCloseTime: this._autoCloseTime,
            canClose: this._canClose,
            showProgress: this._showProgress,
            pauseOnHover: this._pauseOnHover,
            pauseOnFocusLoss: this._pauseOnFocusLoss,
            type: this._type,
            theme: this._theme,
        })
    }
}

/**
 * factory method for toast.
 * 
 * To show toast, set properties with method chain and execute show method.
 * @returns class Toast
 */
export const toastBuilder = () => new ToastBuilder()