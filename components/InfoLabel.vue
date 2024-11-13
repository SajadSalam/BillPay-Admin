<script lang="ts" setup>
interface Props {
    icon: string
    label?: string
    value?: string
}
defineProps<Props>()
const slots = useSlots()
const hasSlot = (name: string) => !!slots[name]
</script>
<template>
    <div class="flex items-center gap-4">
        <div
            class="flex w-10 h-10 justify-center items-center rounded-lg bg-primary-500/5 border-1 border-primary-500 text-primary-500">
            <Icon size="25" :name="icon ?? 'ph:info'"></Icon>
        </div>
        <div class="flex flex-col ">
            <p class="text-muted font-bold text-sm">
                {{ label }}
            </p>
            <p v-if="!hasSlot('value')">
                {{ value }}
            </p>
            <slot name="value" />
        </div>
    </div>
</template>