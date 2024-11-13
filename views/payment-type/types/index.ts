export type PaymentTypeDto = {
    id: string;
    deleted: boolean;
    creationDate: Date;
} & PaymentTypeForm;

export interface PaymentTypeForm {
    name: string;
    isActive: boolean;
    numbers: string[];
    description: string;
    image: FileList | string | null;
}

export interface PaymentTypeFilters {
    isActive?: boolean;
}