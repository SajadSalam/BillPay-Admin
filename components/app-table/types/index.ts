export interface TableHeader {
    label: string
    key: string
}
export type HeaderSlotKey<T> = T extends string ? `header-${T}` : never;
export type DataSlotKey<T> = T extends string ? `data-${T}` : never;

export interface BaseSlots<T> {
    'before-data': any
    'data-actions': (props: { item: T, index: number }) => void
}

export type GenerateSlots<T> = BaseSlots<T> & {
    [K in keyof T as DataSlotKey<K>]: (props: { item: T, index: number }) => void
} & {
    [K in keyof T as HeaderSlotKey<K>]: () => void
}