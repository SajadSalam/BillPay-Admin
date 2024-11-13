<script lang="ts" setup>
import type { DepositType } from '../types';

const props = defineProps<{
  type: DepositType
  size: "sm" | "md" | "lg"
}>()

const sizes = computed(() => {
  return {
    sm: 'h-10 w-10',
    md: 'h-15 w-15',
    lg: 'h-20 w-20'
  }
})

const type = computed(() => {
  const name = props.type === 'ZAIN' ? 'رصيد زين' : props.type === 'ZAINCASH' ? 'زين كاش' : props.type === 'FIB' ? 'مصرف العراق الاول Fib' : 'رصيد اسياسيل';
  const image = props.type === 'ZAIN' ? '/payments/zain.png' : props.type === 'ZAINCASH' ? '/payments/zaincash.png' : props.type === 'FIB' ? '/payments/fib.png' : '/payments/asiacell.png';
  return {
    name,
    image
  }
})
</script>
<template>
  <div class="flex items-center justify-center gap-4">
    <img :src="type.image" :class="sizes[props.size]" class=" border rounded-full object-cover" alt="" srcset="">
    <div>
      <p class="">
        الشحن من خلال
      </p>

      <h1 class="font-bold" :class="{
        'text-2xl': props.size === 'lg',
        'text-xl': props.size === 'md',
        'text-lg': props.size === 'sm',
      }">
        {{ type.name }}
      </h1>
    </div>
  </div>
</template>


<style></style>