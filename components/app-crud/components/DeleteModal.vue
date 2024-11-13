<script setup lang="ts">
import { useAppCrudStore } from '../store/AppCrudStore'
const appCrudStore = useAppCrudStore()
const isDeleteModalOpen = computed({
    get: () => appCrudStore.isDeleteModalOpen,
    set: (value) => (appCrudStore.isDeleteModalOpen = value),
})

const isLoading = ref(false)

const deleteItem = async () => {
    try {
        isLoading.value = true
        // console.log('test')
        if (appCrudStore.deleteService)
            await appCrudStore.deleteService(appCrudStore.itemId as string)
        else throw new Error('No delete service provided')
    } catch (e) {
        console.log(e)
    } finally {
        isLoading.value = false
        isDeleteModalOpen.value = false
    }
}
</script>
<template>
    <AppDialog
        size="lg"
        title="تأكيد الحذف"
        v-model="isDeleteModalOpen"
        :loading="isLoading"
        color="none"
    >
        <div>
            <img src="~/assets/images/trash.gif" class="h-[200px] mx-auto" />
        </div>
        <div class="w-full text-center text-danger-600 text-xl font-bold mt-4">
            هل انت متأكد من اتمام عملية الحذف؟
        </div>
        <div class="flex w-full items-center gap-2 mt-2">
            <BaseButton
                :loading="isLoading"
                @click="deleteItem"
                color="danger"
                rounded="full"
                class="gap-1 flex-grow"
            >
                <Icon name="hugeicons:delete-02" />
                حذف
            </BaseButton>
            <BaseButton
                :loading="isLoading"
                @click="isDeleteModalOpen = false"
                color="muted"
                rounded="full"
                variant="outline"
                class="gap-1 flex-grow"
            >
                الغاء
            </BaseButton>
        </div>
    </AppDialog>
</template>
