<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    uppercase?: boolean
    spaced?: boolean
  }>(),
  {
    uppercase: false,
    spaced: false,
  },
)
</script>

<template>
  <th
    class="text-white dark:text-muted-800 bg-muted-950 dark:bg-muted-200 text-right font-semibold tracking-wider"
    :class="[
      props.uppercase ? 'text-[0.8rem] uppercase' : 'text-sm',
      props.spaced
        ? 'border-muted-200 dark:border-muted-700 last:border-e-none border-r px-2 py-4'
        : 'bg-muted-50 dark:bg-muted-800 py-3',
    ]"
  >
    <slot />
  </th>
</template>
