import { AppClient } from '~/services/app-client'
import type { DepositDto, DepositFilters } from '../types'
import type { PaginatedResponse } from '~/utils/types/ApiResponses'
import axios from '~/services/app-client/axios'
import { FileUploaderClient } from '~/services/app-client/FileUploader'

interface IDepositsService {
    getAll(filters?: DepositFilters): Promise<PaginatedResponse<DepositDto>>
}

export class DepositsService implements IDepositsService {
    apiService: AppClient<DepositDto, DepositDto>
    apiFileService: FileUploaderClient
    constructor() {
        this.apiService = new AppClient<DepositDto, DepositDto>()
        this.apiFileService = new FileUploaderClient()
    }
    async getAll(
        filters?: DepositFilters
    ): Promise<PaginatedResponse<DepositDto>> {
        const response = await this.apiService.get('/deposit', null, filters)
        return response.data as PaginatedResponse<DepositDto>
    }

}
