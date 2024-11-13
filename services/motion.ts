import type { Transition, Variant } from '@vueuse/motion'

type AvailableFunctions = 'slideX' | 'slideY' | 'fadeIn' | 'scale'

interface FunctionMap {
    slideX: (params: SlideXParams) => MotionResult
    slideY: (params: SlideYParams) => MotionResult
    fadeIn: (params: FadeInParams) => MotionResult
    scale: (params: ScaleParams) => MotionResult

}
interface MotionParams {
    transition?: Transition & { delay: number; duration: number }
}

interface SlideXParams extends MotionParams {
    x?: number
}
interface SlideYParams extends MotionParams {
    y?: number
}
interface FadeInParams extends MotionParams {
    opacity?: number
}
interface ScaleParams extends MotionParams {
    scale?: number
}

interface MotionResult {
    initial: Variant
    visible?: Variant
    enter?: Variant
}

export class MotionHeplper {
    private functionName: AvailableFunctions | null = null
    private functionParams: any[] | null = null
    private type = 'enter'

    constructor(functionName: AvailableFunctions, type?: 'enter' | 'visible') {
        if (type)
            this.type = type
        this.functionName = functionName
    }

    public withParams<T extends AvailableFunctions>(...functionParams: Parameters<FunctionMap[T]>) {
        const params = functionParams[0] as Parameters<FunctionMap[T]>[0]
        if (!params.transition) {
            params.transition = {
                delay: 0,
                duration: 1000,
            }
        }
        if (!params.transition.duration)
            params.transition.duration = 1000

        this.functionParams = [params]
        return this
    }

    public execute(): MotionResult {
        if (!this.functionName)
            throw new Error('Function name is not set.')

        if (typeof (this as any)[this.functionName] !== 'function')
            throw new Error(`Function '${this.functionName}' not found in Motion class.`)

        if (!this.functionParams)
            this.functionParams = [{ transition: { delay: 0, duration: 700 } }]

        return (this as any)[this.functionName](...this.functionParams)
    }

    private slideX(params: SlideXParams): MotionResult {
        if (!params.x)
            params.x = -100

        return {
            initial: { x: params.x, opacity: 0 },
            [this.type]: { x: 0, opacity: 1, transition: params.transition },
        }
    }

    private slideY(params: SlideYParams): MotionResult {
        if (!params.y)
            params.y = -100

        return {
            initial: { y: params.y, opacity: 0 },
            [this.type]: { y: 0, opacity: 1, transition: params.transition },
        }
    }

    private fadeIn(params: FadeInParams): MotionResult {
        if (!params.opacity)
            params.opacity = 0

        return {
            initial: { opacity: params.opacity },
            [this.type]: { opacity: 1, transition: params.transition },
        }
    }

    private scale(params: ScaleParams): MotionResult {
        if (!params.scale)
            params.scale = 0

        return {
            initial: { scale: params.scale, opacity: 0 },
            [this.type]: { scale: 1, opacity: 1, transition: params.transition },
        }
    }
}
