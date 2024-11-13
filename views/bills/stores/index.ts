import { AxiosError } from "axios"
import { DepositsService } from "../service"
import { type Deposit, type DepositDto, type DepositFilters, type DepositType } from "../types"
import type { BaseFilters, PaginatedResponse } from "~/utils/types/ApiResponses"
const depositsService = new DepositsService()
type ApiError = AxiosError<PaginatedResponse<DepositDto>>

export const useDepositsStore = defineStore('deposits-page', () => {
    const deposits = ref<Deposit[]>([])
    const totalPages = ref(0)
    const loading = ref(false)
    const error = ref(null)
    const filters = ref<DepositFilters & BaseFilters>({
        pageNumber: 1,
        pageSize: 10
    })

    const manipulateData = (data: DepositDto[]) => {
        return data.map((deposit: DepositDto): Deposit => {
            let fullName = deposit.fibName || deposit.zainCashName
            let phoneNumber = deposit.fibPhoneNumber || deposit.zainCashPhoneNumber
            let type: DepositType = deposit.fibName ? "FIB" : "ZAINCASH"
            if (deposit.cardNumber) {
                type = "ASIACELL"
            }
            return {
                amount: deposit.amount,
                creationDate: deposit.creationDate,
                image: deposit.image,
                id: deposit.id,
                status: deposit.status,
                rejectReason: deposit.rejectReason,
                fullName,
                phoneNumber,
                type
            }
        })
    }
    const fetchDeposits = async () => {
        deposits.value = []
        loading.value = true
        try {
            const response = await depositsService.getAll(filters.value)
            totalPages.value = response.pagesCount;
            deposits.value = manipulateData(response.data) as Deposit[]

        } catch (e) {
            throw e
        } finally {
            loading.value = false
        }
    }
    return {
        deposits, totalPages,
        fetchDeposits,
        filters,
        loading,
    }
})
