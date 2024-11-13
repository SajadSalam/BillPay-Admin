import type { TableHeader } from "@/components/app-table/types";

export const tableHeader: TableHeader[] = [

    {
        key: "fullName",
        label: 'اسم الموزع'
    },
    {
        key: "phoneNumber",
        label: 'رقم الهاتف او البطاقة'
    },
    {
        key: "paymentType",
        label: 'طريقة الشحن'
    },
    {
        key: "amount",
        label: 'المبلغ'
    },
    {
        key: "actions",
        label: 'الاجراءات'
    },
]


export const DepostiStatus = [
    {
        label: 'معلق',
        value: 0,
        color: 'warning'
    },
    {
        label: 'مقبول',
        value: 1,
        color: 'success'
    },
    {
        label: 'مرفوض',
        value: 2,
        color: 'danger'
    }
]

export const findStatus = (value: number) => {
    return DepostiStatus.find((status) => status.value === value) || { label: 'غير معروف', color: 'info' }
}
