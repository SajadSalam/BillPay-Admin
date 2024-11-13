<script setup lang="ts">
import AppInputField from '~/components/app-field/AppInputField.vue';
import { baseURL } from '~/services/app-client/axios';
import type { BaseFilters } from '~/utils/types/ApiResponses';
import { findStatus, tableHeader } from '~/views/bills';
import ApproveDeposit from '~/views/bills/components/ApproveDeposit.vue';
import PaymentType from '~/views/bills/components/PaymentType.vue';
import RejectDeposit from '~/views/bills/components/RejectDeposit.vue';
import ViewDeposit from '~/views/bills/components/ViewDeposit.vue';
import { useDepositsStore } from '~/views/bills/stores';
import type { DepositDto, DepositFilters } from '~/views/bills/types';

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
const isApproveDialogOpen = ref(false)
const isRejectDialogOpen = ref(false)
const deposit = ref<DepositDto | null>(null)

const onDepositView = (item: DepositDto) => {
    deposit.value = item
    isViewDialogOpen.value = true
}

const onDepositApprove = (item: DepositDto) => {
    deposit.value = item
    isApproveDialogOpen.value = true
}

const onDepositReject = (item: DepositDto) => {
    deposit.value = item
    isRejectDialogOpen.value = true
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
            <AppTable title="طلبات الشحن" :headers="tableHeader" :items="deposits">
                <template #data-phoneNumber="{ item }">
                    <span dir="ltr">{{ item.phoneNumber || item.cardNumber }}</span>
                </template>
                <template #data-paymentType="{ item }">
                    <PaymentType size="sm" :type="item.paymentType" />
                </template>
                <template #data-actions="{ item }">
                    <div class="flex gap-2">
                        <BaseTag v-if="item.status != 0" rounded="full" variant="pastel"
                            :color="findStatus(item.status)?.color">
                            <p class="mt-1">{{ findStatus(item.status)?.label }} </p>

                        </BaseTag>
                        <BaseButton @click="onDepositReject(item)" v-if="item.status == 0" class="size-9" color="danger"
                            size="md" rounded="full">
                            <span class="flex size-9 items-center justify-center rounded-full">
                                <Icon name="ph:x" class="text-white size-5" />
                            </span>
                        </BaseButton>
                        <BaseButton @click="onDepositApprove(item)" v-if="item.status == 0" class="size-9"
                            color="success" size="md" rounded="full">
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
        <ViewDeposit :deposit="deposit as DepositDto" v-model="isViewDialogOpen" />
        <ApproveDeposit :deposit="deposit as DepositDto" v-model="isApproveDialogOpen" />
        <RejectDeposit :deposit="deposit as DepositDto" v-model="isRejectDialogOpen" />
    </div>
</template>
