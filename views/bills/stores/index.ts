import { AxiosError } from "axios"
import { DepositsService } from "../service"
import { type ApproveDepositForm, type DepositDto, type DepositFilters, type RejectDepositForm } from "../types"
import type { BaseFilters, PaginatedResponse } from "~/utils/types/ApiResponses"
const depositsService = new DepositsService()
type ApiError = AxiosError<PaginatedResponse<DepositDto>>

export const useDepositsStore = defineStore('deposits-page', () => {
    const deposits = ref<DepositDto[]>([])
    const totalPages = ref(0)
    const loading = ref(false)
    const error = ref(null)
    const filters = ref<DepositFilters & BaseFilters>({
        pageNumber: 1,
        pageSize: 10
    })

    const fetchDeposits = async () => {
        deposits.value = []
        loading.value = true
        try {
            const response = await depositsService.getAll(filters.value)
            totalPages.value = response.pagesCount;
            deposits.value = response.data as DepositDto[]

        } catch (e) {
            throw e
        } finally {
            loading.value = false
        }
    }

    const approveDeposit = async (id: string, body: ApproveDepositForm) => {
        try {
            loading.value = true
            await depositsService.approveDeposit(id, body)
            await fetchDeposits()
        } catch (e) {
            throw e
        }
    }

    const rejectDeposit = async (id: string, body: RejectDepositForm) => {
        try {
            loading.value = true
            await depositsService.rejectDeposit(id, body)
            await fetchDeposits()
        } catch (e) {
            throw e
        }
    }
    return {
        deposits, totalPages,
        fetchDeposits,
        filters,
        loading,
        error,
        approveDeposit,
        rejectDeposit

    }
})
