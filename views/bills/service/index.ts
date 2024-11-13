import { AppClient } from '~/services/app-client'
import type { ApproveDepositForm, DepositDto, DepositFilters, RejectDepositForm } from '../types'
import type { PaginatedResponse } from '~/utils/types/ApiResponses'
import axios from '~/services/app-client/axios'
import axiosIns from '~/services/app-client/axios'

interface IDepositsService {
    getAll(filters?: DepositFilters): Promise<PaginatedResponse<DepositDto>>
    approveDeposit(id: string, body: ApproveDepositForm): Promise<void>
    rejectDeposit(id: string, body: RejectDepositForm): Promise<void>
}

export class DepositsService implements IDepositsService {
    apiService: AppClient<DepositDto, DepositDto>
    constructor() {
        this.apiService = new AppClient<DepositDto, DepositDto>()
    }
    async approveDeposit(id: string, body: ApproveDepositForm): Promise<void> {
        await axiosIns.post(`/deposit/${id}/approve`, body)
    }
    async rejectDeposit(id: string, body: RejectDepositForm): Promise<void> {
        await axiosIns.post(`/deposit/${id}/reject`, body, {
            params: {
                id: id
            }
        })
    }
    async getAll(
        filters?: DepositFilters
    ): Promise<PaginatedResponse<DepositDto>> {
        const response = await this.apiService.get('/deposit', null, filters)
        return response.data as PaginatedResponse<DepositDto>
    }

}
