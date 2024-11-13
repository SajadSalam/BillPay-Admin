import { AppClient } from '~/services/app-client'
import type { DepositDto, DepositFilters } from '../types'
import type { PaginatedResponse } from '~/utils/types/ApiResponses'
import axios from '~/services/app-client/axios'

interface IDepositsService {
    getAll(filters?: DepositFilters): Promise<PaginatedResponse<DepositDto>>
}

export class DepositsService implements IDepositsService {
    apiService: AppClient<DepositDto, DepositDto>
    constructor() {
        this.apiService = new AppClient<DepositDto, DepositDto>()
    }
    async getAll(
        filters?: DepositFilters
    ): Promise<PaginatedResponse<DepositDto>> {
        const response = await this.apiService.get('/deposit', null, filters)
        return response.data as PaginatedResponse<DepositDto>
    }

}
