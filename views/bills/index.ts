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
