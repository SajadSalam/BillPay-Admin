<script lang="ts" setup>
import { baseURL } from '~/services/app-client/axios';
import type { DepositDto } from '../types';
import PaymentType from './PaymentType.vue';

const isDialogOpen = defineModel<boolean>({
  type: Boolean,
  default: false,
})
const props = defineProps<{
  deposit: DepositDto
}>()
</script>


<template>
  <AppDialog v-model="isDialogOpen" title="عرض الايداع" size="lg">
    <PaymentType :type="props.deposit.paymentType" size="lg" />
    <div class="divider border my-3"></div>
    <div class="flex flex-col text-right mx-5">
      <p class="font-bold">
        <Icon name="ph:trash" class="text-danger size-5"></Icon>
        سبب الرفض
      </p>
      <p class="mx-4">
        {{ props.deposit.rejectReason }}
      </p>
    </div>
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
    <div class="flex">
      <img :src="baseURL + props.deposit.image" class="block w-full h-50 rounded-xl" alt="" srcset="">
    </div>
  </AppDialog>
</template>

<style></style>