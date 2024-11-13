<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    light?: boolean
    spaced?: boolean
  }>(),
  {
    light: false,
    spaced: false,
  },
)
</script>

<template>
  <td
    class="font-alt font-normal whitespace-nowrap text-[0.8rem]"
    :class="[
      props.light
        ? 'text-muted-800 dark:text-white'
        : 'text-muted-800 dark:text-white',
        props.spaced
        ? 'border-muted-100 dark:border-muted-700 last:border-e-none dark:bg-muted-800 border bg-white py-3 px-2'
        : 'bg-muted-50 dark:bg-muted-800 py-3',,
    ]"
  >
    <slot />
  </td>
</template>
