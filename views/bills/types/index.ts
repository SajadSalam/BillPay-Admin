import type { BaseDto } from '~/utils/types/ApiResponses'


export interface DepositDto extends BaseDto {
    id: string;
    creationDate: string;
    amount: number;
    fibName?: string;
    fibPhoneNumber?: string;
    image: string;
    zainCashName?: string;
    zainCashPhoneNumber?: string;
    cardNumber?: string;
    status: number;
    rejectReason?: string;
}
export type DepositType = "FIB" | "ZAINCASH" | "ZAIN" | "ASIACELL"
export interface Deposit {
    id: string;
    creationDate: string;
    amount: number;
    fullName?: string;
    phoneNumber?: string;
    cardNumber?: string;
    image: string;
    status: number;
    rejectReason?: string;
    type: DepositType;
}

export interface DepositFilters {
    userName?: string
    fullName?: string
    email?: string
    phoneNumber?: string
    companyName?: string
}
