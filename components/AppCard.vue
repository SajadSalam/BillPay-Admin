<script lang="ts" setup>
interface Props {
    title: string
}
defineProps<Props>()
const slots = useSlots()
const hasSlot = (name: string) => !!slots[name]
</script>
<template>
    <BaseCard color="default" rounded="md" class="p-6">
        <BaseHeading as="h4" size="sm" weight="semibold" lead="tight"
            class="text-muted-800 mb-2 dark:text-white flex items-center justify-between ">
            <h3>
                {{ title }}
            </h3>
            <slot name="actions"></slot>
        </BaseHeading>
        <BaseDropdownDivider />
        <slot></slot>
        <BaseDropdownDivider class="my-3" v-if="hasSlot('footer')" />
        <slot name="footer"></slot>

    </BaseCard>
</template>