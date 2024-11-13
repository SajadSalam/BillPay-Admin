<script setup lang="ts">
interface Props {
    size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
    title: string
    loading?: boolean
    overflowY?: 'auto' | 'visible' // New prop for overflow-y
}
const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    title: 'اضافة',
    overflowY: 'auto', // Default value for overflowY
})
const isDialogOpen = defineModel({
    default: false,
})
const isLoading = computed(() => props.loading)
const slots = useSlots()
const hasSlot = (name: string) => !!slots[name]
</script>

<template>
    <TairoModal :open="isDialogOpen" :size="size" @close="isDialogOpen = true" :overflow="props.overflowY" dir="rtl">
        <template #header>
            <!-- Header -->
            <div v-if="!hasSlot('header')" class="flex w-full items-center justify-between p-4 md:p-6">
                <h3 class="font-heading text-muted-900 text-lg font-medium leading-6 dark:text-white">
                    {{ title }}
                </h3>

                <BaseButton @click="isDialogOpen = false" rounded="full" color="danger" variant="outline" class="!p-2">
                    <Icon name="material-symbols:close-rounded" class="size-5" />
                </BaseButton>
            </div>
            <slot name="header" />
        </template>

        <!-- Body -->

        <div class="px-2 md:px-3" dir="rtl">
            <slot v-if="!isLoading" />
            <AppLoading v-else></AppLoading>
        </div>

        <template #footer>
            <!-- Footer -->

            <div class="flex w-full items-center p-2 md:p-4 gap-2">
                <slot name="actions"></slot>
            </div>
            <slot name="footer" />
        </template>
    </TairoModal>
</template>

<style>
[id^='headlessui-dialog-panel'] {
    max-height: 700px !important;
}
</style>
