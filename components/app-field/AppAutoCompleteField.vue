<script lang="ts" setup generic="T">
import axiosIns from '~/services/app-client/axios'
interface Props {
    items?: T[]
    size?: string
    placeholder?: string
    itemLabel?: string
    itemValue?: string
    label?: string
    appendIcon?: string
    getUrl?: string
    fetchOnSearch?: boolean
    searchKey?: string
    defaultParams?: Record<string, any>
    exclude?: any[]
}
const props = defineProps<Props>()

const model = defineModel({ default: {} })
const selectedItem = ref<string>('')

defineSlots<{
    item: { item: T }
}>()
const menu = ref(null)
const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number | null): void
    (e: 'update:objectValue', value: T | null): void
}>()
const items = ref<T[]>(props.items || [])
const searchKey = computed(() => props.searchKey || 'text')
const filteredItems = computed({
    get: () => {
        if (selectedItem.value)
            return items.value.filter((d) =>
                (d[props.itemLabel as keyof typeof d] as string).includes(
                    selectedItem.value ?? ''
                )
            )
        else return items.value
    },
    set: (_) => {},
})
async function fetchData() {
    if (props.getUrl) {
        let params = { ...props.defaultParams }
        if (props.fetchOnSearch)
            params = { ...params, [searchKey.value]: selectedItem.value }

        const res = await axiosIns.get(props.getUrl, { params })
        nextTick(() => {
            items.value = res.data.data.filter((d: T) => {
                return !props.exclude?.includes(
                    d[props.itemValue as keyof typeof d]
                )
            })
        })
    }
}

onMounted(async () => {
    if (props.getUrl) await fetchData()
    if (model.value && typeof model.value !== 'object') {
        const matchedItem = items.value.find(
            (item) => item[props.itemValue as keyof typeof item] === model.value
        )
        if (matchedItem) {
            selectedItem.value = matchedItem[
                props.itemLabel as keyof typeof matchedItem
            ] as string
        }
    }
    onClickOutside(menu.value, (_) => (isMenuOpen.value = false))
})

const isMenuOpen = ref(false)
watch(selectedItem, () => {
    if (props.fetchOnSearch) fetchData()
})
watch(
    () => model.value,
    (newValue) => {
        if (typeof newValue === 'object' && newValue !== null) {
            selectedItem.value = newValue[
                props.itemLabel as keyof typeof newValue
            ] as string
        } else if (newValue !== null) {
            const matchedItem = items.value.find((item) => {
                return item[props.itemValue as keyof typeof item] === newValue
            })

            if (matchedItem) {
                selectedItem.value = matchedItem[
                    props.itemLabel as keyof typeof matchedItem
                ] as string
            } else {
                selectedItem.value = newValue as string
            }
        }
    },
    { immediate: true }
)
</script>

<template>
    <div ref="menu" class="relative bg-white">
        <BaseInput
            v-model="selectedItem"
            type="text"
            clearable
            :size="props.size ?? 'md'"
            :label="props.label"
            :placeholder="props.label ?? props.placeholder"
            @click="() => (isMenuOpen = true)"
        >
            <template #action>
                <div
                    class="m-auto h-full absolute end-0 top-0 z-[1] flex size-16 items-end justify-end"
                >
                    <button
                        v-if="selectedItem && selectedItem.length > 0"
                        type="button"
                        class="h-full text-muted-400 hover:text-primary-500 size-8 transition-colors duration-300"
                        @click="
                            () => {
                                isMenuOpen = false
                                selectedItem = ''
                                model = ''
                            }
                        "
                    >
                        <Icon name="ph:x" class="size-5" />
                    </button>
                    <button
                        type="button"
                        class="h-full text-primary-500 size-8 transition-all duration-300"
                        :class="isMenuOpen ? 'rotate-180' : ''"
                        @click="
                            () => {
                                isMenuOpen = !isMenuOpen
                            }
                        "
                    >
                        <Icon name="hugeicons:arrow-down-01" class="size-5" />
                    </button>
                </div>
            </template>
        </BaseInput>
        <template v-if="isMenuOpen">
            <div
                class="absolute my-1 w-full border-0 outline-0 rounded-xl bg-muted-50 z-[100]"
            >
                <div
                    v-for="item in filteredItems"
                    class="w-full border p-2 first:rounded-t-xl last:rounded-b-xl bg-muted-50 text-sm hover:bg-primary-500/40"
                    @click="()=>{
          model = item[props.itemValue as keyof typeof item]??''
          selectedItem = item[props.itemLabel as keyof typeof item] as string;
          isMenuOpen = false;
        }
        "
                >
                    {{ item[props.itemLabel as keyof typeof item] }}
                </div>
            </div>
        </template>
    </div>
</template>
