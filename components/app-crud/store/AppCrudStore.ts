type DeleteFunction = (id: string) => Promise<void>

export const useAppCrudStore = defineStore('app-crud', () => {

  const isDeleteModalOpen = ref(false)
  const isLoading = ref(false)
  const itemId = ref<string | null>(null)
  const currentPage = ref(1)
  const setItemId = (id: string) => {
    itemId.value = id
  }

  const deleteService = ref<DeleteFunction|undefined>();

  //let deleteService: DeleteFunction | undefined;

  //TODO: currenty this functoin is being called for every single row which is fucking iodiotic,
  // find a better way to setting the deleteService
  const setDeleteService = (newService: DeleteFunction) => {
    deleteService.value = newService
  }
  return {
    isDeleteModalOpen,
    isLoading,
    itemId,
    currentPage,
    setItemId,
    deleteService,
    setDeleteService
  }
})
