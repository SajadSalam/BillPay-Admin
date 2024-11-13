<script setup lang="ts">
import DeleteModal from './components/DeleteModal.vue'
import { useAppCrudStore } from './store/AppCrudStore'
import type { BaseCrudProps } from './types'
interface Props {
    title?: string
    addButtonText?: string
    description?: string
    pagination?: boolean
    totalPages?: number
    hideCreate?: boolean
    addBtnAction?: () => void
}
const props = defineProps<Props>()

const emits = defineEmits(['update:currentPage'])
const pagination = computed(() => props.pagination)
const appCrudStore = useAppCrudStore()
const route = useRoute()
const currentPage = computed(() => {
    try {
        return Number.parseInt(route.query.pageNumber as string) || 1
    } catch {
        return 1
    }
})
watch(currentPage, (val) => {
    emits('update:currentPage', val)
})
</script>
<template>
    <TairoContentWrapper :title="props.title">
            <template #left>
                <slot name="filters" />
            </template>
            <template #right>
                <BaseButton
                    class="gap-1"
                    color="primary"
                    @click="addBtnAction"
                    rounded="full"
                    v-if="!hideCreate"
                >
                    <Icon name="ph:plus" size="20"></Icon>
                    {{ addButtonText || 'Add new' }}
                </BaseButton>
                <slot name="headerActions" />
            </template>
        <slot></slot>
        <BasePagination
            routerQueryKey="pageNumber"
            class="mt-2"
            v-if="pagination"
            :item-per-page="10"
            :total-items="totalPages! * 10"
            v-model:current-page="currentPage"
            :max-links-displayed="5"
            rounded="lg"
        />
    </TairoContentWrapper>
    <DeleteModal />
</template>
