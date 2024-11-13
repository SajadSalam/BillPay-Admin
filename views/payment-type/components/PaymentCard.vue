<script lang="ts" setup>
import { baseURL } from '~/services/app-client/axios';
import type { PaymentTypeDto } from '../types';
import { usePaymentTypesStore } from '../store';

const props = defineProps<{
  paymentType: PaymentTypeDto;
}>();

const store = usePaymentTypesStore();

</script>


<template>
  <div class="border border-1 rounded-xl relative">
    <div class="absolute top-0 left-0 m-5">
      <BaseButton color="warning" rounded="full" @click="store.openEdit(paymentType.id, paymentType)" size="sm">
        <Icon name="ph:pencil" class="text-xl" />
      </BaseButton>
    </div>
    <img :src="baseURL + paymentType.image" class="w-full h-40 object-cover rounded-t-xl" />
    <div class="pa-2">
      <div class="grid md:grid-cols-2 grid-cols-1  gap-5 border-b-1">
        <div>
          <p class="font-bold">
            <Icon name="ph:user" class="text-primary" />
            الاسم
          </p>
          <p>{{ paymentType.name }}</p>
        </div>
        <div>

          <p class="font-bold">
            <Icon name="ph:acorn" class="text-primary" />
            الحالة
          </p>
          <p>{{ paymentType.isActive ? 'فعال' : 'معطل' }}</p>
        </div>
        <div>
          <p class="font-bold">
            <Icon name="ph:phone" class="text-primary" />
            ارقام التحويل
          </p>
          <div class="flex flex-col gap-1">
            <p v-for="(number, i) in paymentType.numbers" :key="i">{{ number }}</p>
          </div>
        </div>
      </div>
      <div class="flex w-full gap-2 mt-3 ">
        <BaseButton @click="store.toggleActive(paymentType.id)" :color="paymentType.isActive ? 'danger' : 'success'"
          variant="pastel" class="block w-full">
          <Icon :name="paymentType.isActive ? 'ph:x' : 'ph:check'" />
          {{ paymentType.isActive ? 'تعطيل' : 'تفعيل' }}
        </BaseButton>
        <BaseButton color="danger" variant="outline" @click="store.deletePaymentType(paymentType.id)"
          class="block w-full">
          <Icon name="ph:trash" />
          حذف
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style></style>