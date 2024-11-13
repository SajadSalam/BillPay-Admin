<script setup generic="T extends Record<string, string | null>" lang="ts">
import type { LocationQueryValue, RouteParamsRaw } from 'vue-router';
interface AppFiltersProps {
    filters: T;
    query?: boolean;
}
interface Emit {
    (event: 'update:filters', value: T): void
}
const emit = defineEmits<Emit>()
const props = defineProps<AppFiltersProps>()
const router = useRouter()
const route = useRoute()
const filters = computed<T>({
    get: () => props.filters,
    set: (value: T) => emit('update:filters', value)
})

watch(filters, (newFitlers: T) => {
    const newParams: Record<string, string> = {}
    const routeQuery: Record<string, LocationQueryValue[] | LocationQueryValue> = { ...route.query }

    Object.keys(newFitlers).forEach(field => {

        const value = newFitlers[field as keyof T]
        if (!value || value === '' || value === null)
            delete routeQuery[field]
        else
            routeQuery[field as keyof typeof routeQuery] = value
    })

    router.push({
        ...route,
        query: {
            ...routeQuery,
            ...newParams,
        },
    })
}, {
    deep: true
})

const fillFilters = () => {
    const query = route.query
    if (Object.keys(query).length > 0) {
        Object.keys(query).forEach(queryKey => {
            (filters.value as any)[queryKey] = query[queryKey] as string
        })
    }
}

fillFilters()
onMounted(fillFilters)


</script>
<template>
    <slot></slot>
</template>