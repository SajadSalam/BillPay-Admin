<script setup lang="ts">
const props = defineProps<{
  label?: string
  size?: 'sm' | 'md' | 'lg'
  type?: 'text' | 'number' | 'email' | 'password'
}>()
const model = defineModel()
const newChoice = ref('');
const options = ref<string[]>(model.value as any[] ?? []);

watch(newChoice, (newVal) => {
  if (newVal.includes(',')) {
    newVal = newVal.slice(0, newVal.length - 1)
    newChoice.value = newVal;
    if (options.value.includes(newVal))
      return;
    if (newVal.trim().length >= 4) {
      options.value.push(newVal);
    }
    newChoice.value = '';
  }
});

watch(options.value, (newVal) => {
  model.value = newVal;
});

</script>
<template>
  <div class="flex flex-col">
    <span v-if="props.label" class="text-muted-400 text-sm">{{ props.label }}</span>
    <div
      class="border border-1 border-muted-300 dark:border-muted-600 size-full rounded-md flex flex-wrap items-center gap-1 p-1 w-full dark:bg-slate-900">
      <template v-for="(option, index) in options">
        <BaseTag size="md" variant="pastel" color="primary">
          {{ option }}
          <Icon name="ph:x" @click="() => options.splice(index, 1)" />
        </BaseTag>
      </template>
      <input class="border-0 flex-grow outline-0 p-2 h-7 bg-transparent" type="text" v-model="newChoice" />
    </div>
  </div>
</template>
