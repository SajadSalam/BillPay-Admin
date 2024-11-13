export interface BaseCrudProps {
    title: string
    addButtonText?: string
    description?: string
    pagination?: boolean
    totalPages?: number
    hideCreate?: boolean
    addBtnAction?: () => void
}