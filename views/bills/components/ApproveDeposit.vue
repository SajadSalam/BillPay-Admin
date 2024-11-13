<script lang="ts" setup>
import { baseURL } from '~/services/app-client/axios';
import type { ApproveDepositForm, DepositDto } from '../types';
import PaymentType from './PaymentType.vue';
import AppInputField from '~/components/app-field/AppInputField.vue';

const isDialogOpen = defineModel<boolean>({
  type: Boolean,
  default: false,
})
const props = defineProps<{
  deposit: DepositDto
}>()
const body = ref<ApproveDepositForm>({
  amount: 0,
  changePrice: true,
})
watch(() => isDialogOpen.value, () => {
  if (isDialogOpen.value) {
    body.value.amount = props.deposit.amount
  }
})

const store = useDepositsStore()
const approveDeposit = async () => {
  store.loading = true
  await store.approveDeposit(props.deposit.id, body.value)
  store.loading = false
  isDialogOpen.value = false
}
</script>


<template>
  <AppDialog v-model="isDialogOpen" title="الموافقة الايداع">
    <PaymentType :type="props.deposit.paymentType" size="lg" />
    <div class="flex items-center flex-col mt-4 gap-4 ">
      <AppInputField v-model="body.amount" class="w-100%" label="المبلغ" />
      <BaseButton color="primary" rounded="full" class="w-100%" @click="approveDeposit" :loading="store.loading">
        الموافقة على المبلغ المدخل
      </BaseButton>
    </div>
  </AppDialog>
</template>
