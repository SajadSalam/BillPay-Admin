<script setup generic="T" lang="ts">
import TableDataGenerator from './components/TableDataGenerator.vue';
import TableHeadersGenerator from './components/TableHeadersGenerator.vue';
import TableNoData from './components/TableNoData.vue';
import TableLoading from './components/TableLoading.vue';
import { useAppTableStore } from './stores/AppTableStore';
import type { TableHeader, GenerateSlots } from './types';


const appTableStore = useAppTableStore()
interface Props {
  headers: TableHeader[]
  items: T[]
  title?:string
}
const props = defineProps<Props>()
appTableStore.setData(props.items)
const isLoading = computed(() => appTableStore.isLoading)
const headers = computed(() => props.headers)


const slots = useSlots()
const hasSlot = (name: string) => !!slots[name]
const headerSlots = computed(() => {
  return Object.keys(slots).filter(name => name.startsWith('header-'))
})

const dataSlotsKeys = computed(() => {
  return Object.keys(slots).filter(name => name.startsWith('data-'))
})

const slotName = (slot: string): keyof GenerateSlots<T> => {
  return slot as keyof GenerateSlots<T>
}

defineSlots<GenerateSlots<T>>()

</script>
<template>
  <div class="w-full rounded-3xl border border-muted-100 !bg-white py-2 px-3">
    <p v-if="props.title" class="mb-2 font-semibold text-base	">{{ props.title }}</p>
  <div class="w-full rounded-3xl border border-muted-100 !bg-white py-2 px-3 overflow-auto">
    <TairoTable :scrollable="false" class="w-full rounded-full">
      <template #header>
        <TableHeadersGenerator class="bg-black w-full" :headers="headers">
          <template v-for="headerSlot in headerSlots" #[headerSlot]>
            <slot :name="slotName(headerSlot)"></slot>
          </template>
        </TableHeadersGenerator>
      </template>
      <TairoTableRow v-if="hasSlot('before-data')">
        <TairoTableCell>
          <slot name="before-data"></slot>
        </TairoTableCell>
      </TairoTableRow>
      <TableDataGenerator v-if="!isLoading" :headers="headers" :items="items">
        <template v-for="dataSlot in dataSlotsKeys" #[slotName(dataSlot)]="slotProps">
          <slot :name="slotName(dataSlot)" v-bind="slotProps"></slot>
        </template>
      </TableDataGenerator>
      <TableLoading v-else :columns="headers.length" :rows="headers.length" />
    </TairoTable>
    <div class="flex justify-center">
      <TableNoData v-if="items.length == 0 && !isLoading" />
    </div>
    </div>
  </div>
</template>
<style>
table {
  width: 100%;
  border-spacing: var(--tw-border-spacing-x) 0.5rem;
  border-collapse: separate;
}

td {
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
