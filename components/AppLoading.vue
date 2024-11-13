<script setup lang="ts">
interface Props {
    showAvatar?: boolean
}
defineProps<Props>()
</script>


<template>
    <div class="flex items-center px-2">
        <BasePlaceload v-if="showAvatar" class="size-10 rounded-full" />
        <div class="ms-3 grow space-y-2">
            <BasePlaceload class="h-3 w-full rounded" />

            <BasePlaceload class="h-3 w-[85%] rounded" />
        </div>
    </div>
</template>