<script lang="ts" setup>
import AppAutoCompleteField from '~/components/app-field/AppAutoCompleteField.vue';
import PaymentCard from '~/views/payment-type/components/PaymentCard.vue';
import PaymentTypeCreate from '~/views/payment-type/components/PaymentTypeCreate.vue';
import PaymentTypeUpdate from '~/views/payment-type/components/PaymentTypeUpdate.vue';
import { usePaymentTypesStore } from '~/views/payment-type/store';


definePageMeta({
  title: 'اعدادات الدفع',
  preview: {
    title: 'main Page',
    description: 'Manage main and their data',
    categories: ['layouts', 'lists'],
    order: 44,
  },
})

const paymentTypesStore = usePaymentTypesStore()
await paymentTypesStore.fetchPaymentTypes()
const filters = computed({
  get() {
    return paymentTypesStore.filters
  },
  set(value) {
    paymentTypesStore.filters = value
  },
})
const paymentTypes = computed(() => paymentTypesStore.paymentTypes)

const isActiveFilterData = [
  { text: 'فعال', value: true },
  { text: 'معطل', value: false },
]
</script>

<template>
  <div>
    <AppCrud title="اعدادات الدفع" pagination :total-pages="paymentTypesStore.totalPages"
      v-model:current-page="filters.pageNumber" :add-btn-action="() => paymentTypesStore.isCreateDialogOpen = true"
      add-button-text="اضافة نوع دفع">
      <template #filters>
        <AppFilters v-model:filters="filters" query>
          <AppAutoCompleteField icon="hugeicons:search-01" :items="isActiveFilterData" v-model="filters.isActive"
            item-label="text" item-value="value" placeholder="الحالة" />

        </AppFilters>
      </template>

      <div class="grid md:grid-cols-3 grid-cols-1 gap-5" v-if="!paymentTypesStore.loading">
        <PaymentCard v-for="paymentType in paymentTypes" :key="paymentType.id" :paymentType="paymentType" />
      </div>
      <AppLoading v-else />
    </AppCrud>
    <PaymentTypeCreate />
    <PaymentTypeUpdate />
  </div>
</template>

<style></style>