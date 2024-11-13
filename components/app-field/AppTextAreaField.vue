<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core';

const props = defineProps<{
  label?: string
  size?: 'sm' | 'md' | 'lg'
  errors?: ErrorObject[]
}>()
const model = defineModel()
const error = computed(() => {
  return props.errors?.length ? props.errors.map((e) => e.$message).join(', ') : ''
})
</script>
<template>
  <BaseTextarea :error="error" :size="props.size ?? 'md'" :label="props.label" :placeholder="props.label"
    v-model="model" />
</template>
<style>
.nui-textarea-wrapper.nui-textarea-default .nui-textarea:where([class~="dark"], [class~="dark"] *) {
  background-color: transparent !important;
}
</style>