import { AxiosError } from "axios"
import { PaymentTypesService } from "../service"
import type { PaymentTypeDto, PaymentTypeFilters, PaymentTypeForm } from "../types"
import type { BaseFilters, PaginatedResponse } from "~/utils/types/ApiResponses"
const paymentTypesService = new PaymentTypesService()
type ApiError = AxiosError<PaginatedResponse<PaymentTypeDto>>

export const usePaymentTypesStore = defineStore('paymentTypes-page', () => {
    const paymentTypes = ref<PaymentTypeDto[]>([])
    const totalPages = ref(0)
    const loading = ref(false)
    const error = ref(null)
    const editPaymentType = ref<PaymentTypeForm | null>(null)
    const editId = ref('')
    const filters = ref<PaymentTypeFilters & BaseFilters>({
        pageNumber: 1,
        pageSize: 10
    })
    const isCreateDialogOpen = ref(false)
    const isEditDialogOpen = ref(false)
    const fetchPaymentTypes = async () => {
        paymentTypes.value = []
        loading.value = true
        try {
            const response = await paymentTypesService.getAll(filters.value)
            totalPages.value = response.pagesCount;
            paymentTypes.value = response.data as PaymentTypeDto[]

        } catch (e) {
            throw e
        } finally {
            loading.value = false
        }
    }

    const createPaymentType = async (paymentType: PaymentTypeForm) => {
        try {
            loading.value = true
            await paymentTypesService.create(paymentType)
            await fetchPaymentTypes()
        } catch (e) {
            throw e
        }
    }

    const toggleActive = async (id: string) => {
        try {
            loading.value = true
            await paymentTypesService.toggleActive(id)
            await fetchPaymentTypes()
        } catch (e) {
            throw e
        }
    }

    const deletePaymentType = async (id: string) => {
        try {
            loading.value = true
            await paymentTypesService.delete(id)
            await fetchPaymentTypes()
        } catch (e) {
            throw e
        }
    }

    const openEdit = (id: string, paymentType: PaymentTypeDto) => {
        editId.value = id
        editPaymentType.value = paymentType
        isEditDialogOpen.value = true
    }

    const updatePaymentType = async (paymentType: PaymentTypeForm) => {
        try {
            loading.value = true
            if (editPaymentType.value) {
                await paymentTypesService.update(editId.value, paymentType)
                await fetchPaymentTypes()
                editPaymentType.value = null
                editId.value = ''
                isEditDialogOpen.value = false
            }
        } catch (e) {
            throw e
        }
    }

    return {
        paymentTypes,
        totalPages,
        fetchPaymentTypes,
        filters,
        loading,
        isCreateDialogOpen,
        createPaymentType,
        toggleActive,
        deletePaymentType,
        editPaymentType,
        isEditDialogOpen,
        openEdit,
        updatePaymentType
    }
})
