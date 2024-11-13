import type { AxiosResponse } from "axios";
import axios from "./axios"
import type { PaginatedResponse, ResponseWithoutPagination } from "~/utils/types/ApiResponses";

interface IAppClient<T, TCreateUpdate> {
    get: (url: string, id?: string, params?: Record<string, any>) => Promise<AxiosResponse<PaginatedResponse<T> | ResponseWithoutPagination<T>>>;
    post: (url: string, data: TCreateUpdate) => Promise<AxiosResponse<T>>;
    put: (url: string, data: TCreateUpdate) => Promise<AxiosResponse<T>>;
    patch: (url: string, data: TCreateUpdate) => Promise<AxiosResponse<T>>;
    delete: (url: string, id: string) => Promise<AxiosResponse<T>>;
}

export class AppClient<T, TCreateUpdate> implements IAppClient<T, TCreateUpdate> {
    get(url: string, id?: string | null, params?: Record<string, any>): Promise<AxiosResponse<PaginatedResponse<T> | ResponseWithoutPagination<T>>> {
        if (params) {
            params.deleted = false
        } else {
            params = { deleted: false }
        }
        if (id)
            url += "/" + id
        return axios.get<PaginatedResponse<T> | T>(url, { params }) as Promise<AxiosResponse<PaginatedResponse<T> | ResponseWithoutPagination<T>>>
    }

    post(url: string, data?: TCreateUpdate): Promise<AxiosResponse<T>> {
        return axios.post<T>(url, data)
    }

    put(url: string, data: TCreateUpdate): Promise<AxiosResponse<T>> {
        return axios.put(url, data)
    }

    delete(url: string, id: string): Promise<AxiosResponse<T>> {
        return axios.delete(`${url}/${id}`)
    }

    patch(url: string, data: TCreateUpdate): Promise<AxiosResponse<T>> {
        return axios.patch(url, data)
    }
}
