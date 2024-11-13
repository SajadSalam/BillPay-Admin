<script setup lang="ts">
import AppInputField from '~/components/app-field/AppInputField.vue';
import { baseURL } from '~/services/app-client/axios';
import type { BaseFilters } from '~/utils/types/ApiResponses';
import { tableHeader } from '~/views/bills';
import PaymentType from '~/views/bills/components/PaymentType.vue';
import ViewDeposit from '~/views/bills/components/ViewDeposit.vue';
import { useDepositsStore } from '~/views/bills/stores';
import type { Deposit, DepositFilters } from '~/views/bills/types';

definePageMeta({
    title: 'الرئيسية',
    preview: {
        title: 'main Page',
        description: 'Manage main and their data',
        categories: ['layouts', 'lists'],
        order: 44,
    },
})

const depositsStore = useDepositsStore()
const filters = computed<DepositFilters & BaseFilters>({
    get() {
        return depositsStore.filters
    },
    set(value) {
        depositsStore.filters = value
    },
})
const appTableStore = useAppTableStore()
await depositsStore.fetchDeposits()
appTableStore.setLoading(false)
const deposits = computed(() => depositsStore.deposits)

const isViewDialogOpen = ref(false)

const deposit = ref<Deposit | null>(null)

const onDepositView = (item: Deposit) => {
    deposit.value = item
    isViewDialogOpen.value = true
}
</script>

<template>
    <div>
        <AppCrud title="البحث" pagination :total-pages="depositsStore.totalPages"
            v-model:current-page="filters.pageNumber" hide-create>
            <template #filters>
                <AppFilters v-model:filters="filters" query>
                    <AppInputField icon="hugeicons:search-01" v-model="filters.fullName" placeholder="اسم الموزع" />
                    <AppInputField icon="hugeicons:search-01" v-model="filters.phoneNumber" placeholder="رقم الهاتف" />
                </AppFilters>
            </template>
            <AppTable title="الموزعون الفرعيون" :headers="tableHeader" :items="deposits">

                <template #data-type="{ item }">
                    <PaymentType size="sm" :type="item.type" />
                </template>
                <template #data-actions="{ item }">
                    <div class="flex gap-2">
                        <BaseButton class="size-9" color="danger" size="md" rounded="full">
                            <span class="flex size-9 items-center justify-center rounded-full">
                                <Icon name="ph:x" class="text-white size-5" />
                            </span>
                        </BaseButton>
                        <BaseButton class="size-9" color="success" size="md" rounded="full">
                            <span class="flex size-9 items-center justify-center rounded-full">
                                <Icon name="ph:check" class="text-white size-5" />
                            </span>
                        </BaseButton>
                        <BaseButton class="size-9" color="info" size="md" rounded="full" @click="onDepositView(item)">
                            <span class="flex size-9 items-center justify-center rounded-full">
                                <Icon name="ph:eye" class="text-white size-5" />
                            </span>
                        </BaseButton>
                    </div>
                </template>
                <template #data-amount="{ item }">
                    <span class="text-center text-xl text-primary font-bold">{{ item.amount.toLocaleString() }}
                        د.ع</span>
                </template>
            </AppTable>
        </AppCrud>
        <ViewDeposit :deposit="deposit" v-model="isViewDialogOpen" />
    </div>
</template>
