<script lang="ts" setup>
import type { Deposit } from '../types';

const isDialogOpen = defineModel<boolean>({
  type: Boolean,
  default: false,
})
const props = defineProps<{
  deposit: Deposit
}>()
const type = computed(() => {
  const name = props.deposit.type === 'ZAIN' ? 'رصيد زين' : props.deposit.type === 'ZAINCASH' ? 'زين كاش' : props.deposit.type === 'FIB' ? 'مصرف العراق الاول Fib' : 'رصيد اسياسيل';
  const image = props.deposit.type === 'ZAIN' ? '/payments/zain.png' : props.deposit.type === 'ZAINCASH' ? '/payments/zaincash.png' : props.deposit.type === 'FIB' ? '/payments/fib.png' : '/payments/asiacell.png';
  return {
    name,
    image
  }
})
</script>


<template>
  <AppDialog v-model="isDialogOpen" title="عرض الايداع" size="lg">
    <div class="flex items-center justify-center gap-4">
      <img :src="type.image" class="h-15 w-15 border rounded-full object-cover" alt="" srcset="">
      <div>
        <p class="">
          الشحن من خلال
        </p>

        <h1 class="text-2xl font-bold">
          {{ type.name }}
        </h1>
      </div>
    </div>
    <div class="divider border my-3"></div>
    <div class="grid grid-cols-2 gap-4 pa-5 items-center justify-center text-center">
      <div class="flex flex-col text-right">
        <p class="font-bold">
          <Icon name="ph:user" class="text-primary size-5"></Icon>
          الاسم الكامل
        </p>
        <p class="mx-4">
          {{ props.deposit.fullName }}
        </p>
      </div>
      <div class="flex flex-col text-right">
        <p class="font-bold">
          <Icon name="ph:phone" class="text-primary size-5"></Icon>
          رقم الهاتف
        </p>
        <p class="mx-4">
          {{ props.deposit.phoneNumber }}
        </p>
      </div>
      <div class="flex flex-col text-right">
        <p class="font-bold">
          <Icon name="ph:currency-circle-dollar" class="text-primary size-5"></Icon>
          المبلغ
        </p>
        <p class="mx-4">
          {{ props.deposit.amount.toLocaleString() }}
        </p>
      </div>
      <div v-if="props.deposit.cardNumber" class="flex flex-col text-right">
        <p class="font-bold">
          <Icon name="ph:phone" class="text-primary size-5"></Icon>
          رقم البطاقة او عملية التحويل
        </p>
        <p class="mx-4">
          {{ props.deposit.cardNumber }}
        </p>
      </div>
    </div>
  </AppDialog>
</template>

<style></style>