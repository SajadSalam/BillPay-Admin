import type { BaseDto } from '~/utils/types/ApiResponses'
import type { PaymentTypeDto } from '~/views/payment-type/types';


export interface DepositDto extends BaseDto {
    amount: number;
    fullName: string;
    phoneNumber: string;
    image: string;
    cardNumber: string;
    status: number;
    rejectReason: string;
    paymentTypeId: string;
    paymentType: PaymentTypeDto;
}

export interface DepositFilters {
    userName?: string
    fullName?: string
    email?: string
    phoneNumber?: string
    companyName?: string
}
export interface ApproveDepositForm {
    amount: number;
    changePrice: boolean;
}
export interface RejectDepositForm {
    reason: string;
}