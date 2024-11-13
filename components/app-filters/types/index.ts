export interface AppFiltersProps<T extends Record<string, string>> {
    filters: T;
    query?: boolean;
}