<script lang="ts" setup>
import type { TableHeader } from '../types';

interface Props {
    headers: TableHeader[]
}
const props = defineProps<Props>()
const headers = computed(() => props.headers)
const slots = useSlots()
const hasSlot = (name: string) => !!slots[name]
</script>
<template>
    <TairoTableHeading class="text-center" v-for="header in headers" :key="header.key" uppercase spaced>
        <span v-if="!hasSlot(`header-${header.key}`)" :id="`header-${header.key}`">
            {{ header.label }}
        </span>
        <slot v-else :name="`header-${header.key}`" />
    </TairoTableHeading>
</template>
