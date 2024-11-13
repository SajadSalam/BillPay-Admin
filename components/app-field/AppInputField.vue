<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
const props = defineProps<{
    label?: string
    placeholder?: string
    required?: boolean
    size?: 'sm' | 'md' | 'lg'
    rounded?: 'sm' | 'md' | 'lg' | 'full'
    type?: 'text' | 'number' | 'email' | 'password' | 'date'
    errors?: ErrorObject[]
    monthPicker?: boolean
    icon?: string
    clearable?: boolean
    disabled?: boolean
}>()
const model = defineModel()
const color = useColorMode()
const error = computed(() => {
    return props.errors?.length
        ? props.errors.map((e) => e.$message).join(', ')
        : ''
})
const dark = computed<boolean>(() => {
    return color.value == 'dark'
})
</script>
<template>
    <div classs="block w-full">
        <BaseInput :size="props.size ?? 'md'" :label="props.label
            ? props.label + (props.label && props.required ? '*' : '')
            : ''
            " :placeholder="props.placeholder" :type="props.type ?? 'text'" :rounded="props.rounded ?? 'sm'"
            class="bg-accent border-accent " contrast="default" :error="error" :icon="props.icon" v-model="model"
            v-if="props.type != 'date'" />
        <template v-else>
            <div class="flex flex-col justify-between">
                <span v-if="props.label" class="dp__label">
                    {{ props.label }}
                </span>
                <VueDatePicker v-model="model" select-text="تأكيد" cancel-text="ألغاء" :label="props.label"
                    :placeholder="props.placeholder" :enable-time-picker="false" :dark :month-picker="props.monthPicker"
                    :clearable="props.clearable" :disabled="props.disabled">
                    <template #input-icon>
                        <Icon name="hugeicons:calendar-03" class="h-[20px] w-auto mr-2" />
                    </template>
                    <template #arrow-left>
                        <Icon name="ph:arrow-bend-down-right" />
                    </template>
                    <template #arrow-right>
                        <Icon name="ph:arrow-bend-down-left" />
                    </template>
                </VueDatePicker>
            </div>
        </template>
    </div>
</template>

<style>
.bg-transparent {
    background-color: transparent !important;
}

.nui-input-wrapper.nui-input-default .nui-input:where([class~='dark'], [class~='dark'] *) {
    background-color: transparent !important;
}
</style>
