<script lang="ts" setup>
import { baseURL } from '~/services/app-client/axios';
import type { ApproveDepositForm, DepositDto, RejectDepositForm } from '../types';
import PaymentType from './PaymentType.vue';
import AppInputField from '~/components/app-field/AppInputField.vue';

const isDialogOpen = defineModel<boolean>({
  type: Boolean,
  default: false,
})
const props = defineProps<{
  deposit: DepositDto
}>()
const body = ref<RejectDepositForm>({
  reason: ''
})
watch(() => isDialogOpen.value, () => {
  if (isDialogOpen.value) {
    body.value.reason = ''
  }
})

const store = useDepositsStore()
const rejectDeposit = async () => {
  store.loading = true
  await store.rejectDeposit(props.deposit.id, body.value)
  store.loading = false
  isDialogOpen.value = false
}
</script>


<template>
  <AppDialog v-model="isDialogOpen" title="رفض الايداع">
    <div class="flex items-center flex-col mt-4 gap-4 ">
      <AppInputField v-model="body.reason" class="w-100%" label="السبب" />
      <BaseButton color="danger" rounded="full" class="w-100%" @click="rejectDeposit" :loading="store.loading">
        رفض على عملية الايداع
      </BaseButton>
    </div>
  </AppDialog>
</template>
