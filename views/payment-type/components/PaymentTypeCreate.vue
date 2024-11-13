<script lang="ts" setup>
import { Validator } from '~/services/validator';
import { usePaymentTypesStore } from '../store';
import type { PaymentTypeForm } from '../types';
import { initailBody } from '..';
import { requiredValidator } from '~/services/validation';
import AppInputField from '~/components/app-field/AppInputField.vue';
import AppFileField from '~/components/app-field/AppFileField.vue';

const store = usePaymentTypesStore()

const isDialogOpen = computed({
  get() {
    return store.isCreateDialogOpen
  },
  set(value) {
    store.isCreateDialogOpen = value
  }
})
const body = ref<PaymentTypeForm & {
  image: FileList | null | string
}>({ ...initailBody })

const submit = async () => {
  if (!body.value.name || !body.value.image) {
    return
  }
  await store.createPaymentType(body.value)
  body.value = { ...initailBody }
  isDialogOpen.value = false

}

</script>

<template>
  <AppDialog :loading="store.loading" size="xl" v-model="isDialogOpen" title="اضافة نوع دفع">
    <div class="grid grid-cols-1 gap-5 text-right">
      <AppInputField v-model="body.name" label="الاسم" icon="ph:user" />
      <div>
        <div class="flex justify-between">
          <p class="font-bold">
            ارقام التحويل
          </p>
          <BaseButton color="primary" @click="body.numbers.push('')" class="btn btn-primary">
            اضافة
          </BaseButton>
        </div>
        <div class="flex items-center my-2 w-100% gap-2" v-for="(number, i) in body.numbers" :key="i">
          <AppInputField class="w-100%" v-model="body.numbers[i]" :label="`رقم التحويل ${i + 1}`" icon="ph:phone" />
          <BaseButton class="mt-5" rounded="full" color="danger" @click="body.numbers.splice(i, 1)">
            حذف
          </BaseButton>
        </div>
      </div>
      <AppFileField v-model="body.image" label="الصورة" icon="ph:user" />
    </div>
    <template #footer>
      <div class="pa-5">
        <BaseButton color="primary" @click="submit" class="btn btn-primary">
          <Icon name="ph:check" />
          اضافة نوع دفع جديد
        </BaseButton>
      </div>
    </template>
  </AppDialog>
</template>


<style></style>