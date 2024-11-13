<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        reverse?: boolean
        title?: string
    }>(),
    {
        reverse: false,
        title: '',
    }
)
</script>

<template>
    <div>
        <p v-if="props.title" class="mb-2 mr-2 font-semibold text-base">
            {{ props.title }}
        </p>
        <div
            v-if="'left' in $slots || 'right' in $slots"
            :class="[
                'mb-6 flex w-full flex-col p-2 rounded-3xl items-center justify-between gap-4 sm:flex-row',
                props.reverse && 'sm:flex-row-reverse',
                props.title ? 'bg-white border border-muted-100' : '',
            ]"
        >
            <div class="flex w-full items-center gap-4 sm:w-auto">
                <slot name="left" />
            </div>
            <div class="flex w-full items-center justify-end gap-4 sm:w-auto">
                <slot name="right" />
            </div>
        </div>
        <slot />
    </div>
</template>
