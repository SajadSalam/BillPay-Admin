import type { TableHeader } from "../types";


export const useAppTableStore = defineStore('app-table', () => {
    const headers = ref<TableHeader[]>([])
    const data = ref<any[]>([])

    const isLoading = ref(true)

    const setHeaders = (newHeaders: TableHeader[]) => {
        headers.value = newHeaders
    }

    const setData = (newData: any[]) => {
        data.value = newData
    }

    const setLoading = (status: boolean) => {
        isLoading.value = status
    }

    const toggleLoading = () => {
        isLoading.value = !isLoading.value
    }

    return {
        headers,
        data,
        isLoading,
        setHeaders,
        setData,
        setLoading,
        toggleLoading,
    }

});
