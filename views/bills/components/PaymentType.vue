<script lang="ts" setup>
import type { PaymentTypeDto } from '~/views/payment-type/types';
import { baseURL } from '~/services/app-client/axios';

const props = defineProps<{
  type: PaymentTypeDto
  size: "sm" | "md" | "lg"
}>()

const sizes = computed(() => {
  return {
    sm: 'h-10 w-10',
    md: 'h-15 w-15',
    lg: 'h-20 w-20'
  }
})

</script>
<template>
  <div class="flex items-center justify-center gap-4">
    <img :src="baseURL + type.image" :class="sizes[props.size]" class=" border rounded-full object-cover" alt=""
      srcset="">
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