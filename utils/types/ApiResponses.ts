export interface PaginatedResponse<T> {
    data: T[];
    pagesCount: number;
    currentPage: number;
    type?: string;
}
export interface BaseDto {
    id: string;
    deleted: boolean;
    createdAt: string;
}
export interface BaseFilters extends Record<string, any> {
    pageNumber: number;
    pageSize: number;
}
export interface ResponseWithoutPagination<T> {
    data: T[];
}
