import { AppClient } from '~/services/app-client'
import type { PaymentTypeDto, PaymentTypeFilters, PaymentTypeForm } from '../types'
import type { PaginatedResponse } from '~/utils/types/ApiResponses'
import axios from '~/services/app-client/axios'
import { FileService } from '~/services/app-client/FileUploader'

interface IPaymentTypesService {
    getAll(filters?: PaymentTypeFilters): Promise<PaginatedResponse<PaymentTypeDto>>
    create(data: PaymentTypeForm): Promise<PaymentTypeDto>
    toggleActive(id: string): Promise<PaymentTypeDto>
    delete(id: string): Promise<PaymentTypeDto>
    update(id: string, data: PaymentTypeForm): Promise<PaymentTypeDto>
}

export class PaymentTypesService implements IPaymentTypesService {
    apiService: AppClient<PaymentTypeDto, PaymentTypeForm>
    apiFileService: FileService
    constructor() {
        this.apiService = new AppClient<PaymentTypeDto, PaymentTypeForm>()
        this.apiFileService = new FileService()
    }
    async update(id: string, data: PaymentTypeForm): Promise<PaymentTypeDto> {
        const response = await this.apiService.put(`/payment-types/${id}`, data)
        return response.data as PaymentTypeDto
    }
    async delete(id: string): Promise<PaymentTypeDto> {
        const response = await axios.delete(`/payment-types/${id}`)
        return response.data as PaymentTypeDto
    }
    async getAll(filters?: PaymentTypeFilters): Promise<PaginatedResponse<PaymentTypeDto>> {
        const response = await this.apiService.get('/payment-types', null, filters)
        return response.data as PaginatedResponse<PaymentTypeDto>
    }

    async create(data: PaymentTypeForm): Promise<PaymentTypeDto> {
        data.image = await this.getFilePath(data.image![0] as File)
        const response = await this.apiService.post('/payment-types', data)
        return response.data as PaymentTypeDto
    }
    async getFilePath(file: File): Promise<string> {
        try {
            const res = await this.apiFileService.uploadFile(file)
            return res
        } catch (err) {
            console.log(err)
        }
        return ''
    }
    async toggleActive(id: string): Promise<PaymentTypeDto> {
        const response = await axios.patch(`/payment-types/active/${id}`)
        return response.data as PaymentTypeDto
    }

}
