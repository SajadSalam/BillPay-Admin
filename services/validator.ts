import useVuelidate from '@vuelidate/core'
import { reactive, computed, ref, type Reactive } from 'vue'
import type { Validation, ValidationRuleCollection } from '@vuelidate/core'

export class Validator<T extends object> {
    public formData: Reactive<T>
    public rules: Partial<Record<keyof T, ValidationRuleCollection>>
    public validation: Ref<Validation<T>>

    constructor(
        formData: T,
        rules: Partial<Record<keyof T, ValidationRuleCollection>> = {}
    ) {
        this.formData = reactive(formData)
        this.rules = rules
        this.validation = this.createValidation()
    }

    public createValidation(): Ref<Validation<T>> {
        const defaultRules: Record<keyof T, ValidationRuleCollection> =
            Object.keys(this.formData).reduce((acc, key) => {
                acc[key as keyof T] = (this.rules[key as keyof T] ||
                    []) as ValidationRuleCollection

                return acc
            }, {} as Record<keyof T, ValidationRuleCollection>)

        const computedRules = computed(() => defaultRules)

        const validation = useVuelidate(
            computedRules.value,
            this.formData
        ) as Ref<Validation<T>>

        return validation
    }

    extractBody(): T {
        const keys = Object.keys(this.validation.value) as (keyof T)[]
        return keys.reduce((acc, key) => {
            if (this.validation.value[key] && !key.toString().startsWith('$')) {
                acc[key] = this.validation.value[key].$model
            }
            return acc
        }, {} as T)
    }

    resetBody(): void {
        const keys = Object.keys(this.validation.value) as (keyof T)[]
        keys.forEach((key) => {
            if (this.validation.value[key] && !key.toString().startsWith('$')) {
                if (Array.isArray(this.validation.value[key].$model)) {
                    this.validation.value[key].$model = []
                } else {
                    this.validation.value[key].$model = null
                }
            }
        })
        this.validation.value.$reset()
    }

    fillBody(data: T, customKeys?: { fromKey: string; toKey: string }[]): void {
        const keys = Object.keys(this.validation.value) as (keyof T)[]
        keys.forEach((key) => {
            if (!key.toString().startsWith('$')) {
                if (customKeys) {
                    customKeys.forEach((customKey) => {
                        if (customKey.fromKey === key.toString()) {
                            this.validation.value[customKey.fromKey].$model =
                                data[customKey.toKey as keyof T]
                        }
                    })
                } else {
                    customKeys = []
                }
                if (
                    this.validation.value[key] &&
                    !customKeys.map((v) => v.fromKey).includes(key.toString())
                ) {
                    this.validation.value[key].$model = data[key]
                }
            }
        })
    }
}
