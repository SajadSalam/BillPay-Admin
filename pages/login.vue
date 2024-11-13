<script setup lang="ts">
import { MotionHeplper } from '~/services/motion';
import AppInputField from '~/components/app-field/AppInputField.vue';
import { Validator } from '~/services/validator';
import { requiredValidator } from '~/services/validation';
import type { LoginForm } from '~/views/auth/types';
import { useAuthStore } from '~/views/auth/stores';

definePageMeta({
  layout: 'empty',
  title: 'Login',

})
const validator = new Validator<LoginForm>({
  email: '',
  password: '',
}, {
  email: { required: requiredValidator('البريد الالكتروني') },
  password: { required: requiredValidator('كلمة المرور') },
})

const body = validator.validation


const authStore = useAuthStore()
const router = useRouter()
const onFormSubmit = async () => {
  const isValid = await body.value.$validate()
  if (!isValid) return
  await authStore.login(validator.extractBody())
  window.location.href = '/'
}

</script>

<template>
  <div class="login-bg p-5 w-100% flex flex-col items-center justify-center ">

    <div class="grid grid-cols-3 items-center justify-center">
      <div class="bg-white col-span-2 text-black w-50% rounded-3xl p-10">
        <h1 class="text-center font-bold text-2xl">
          تسجيل الدخول
        </h1>
        <div class="flex flex-col mt-10 gap-4">
          <AppInputField v-model="body.email.$model" :errors="body.email.$errors" label="البريد الالكتروني"
            icon="ph:user">
          </AppInputField>
          <AppInputField v-model="body.password.$model" :errors="body.password.$errors" label="كلمة المرور"
            icon="ph:lock" type="password">
          </AppInputField>
          <BaseButton rounded="full" @click="onFormSubmit" color="primary" class="rounded-full">
            تسجيل الدخول
          </BaseButton>
        </div>
      </div>
      <h1 class="text-4xl mx-5 mb-40 ">
        مرحبا بك الى
        لوحة تحكم دفوعات
        <span class="text-primary">عينكاوا بت</span>
      </h1>
    </div>

    <div class="logo mx-5">
      <img src="/logo.png" class="h-30 w-65 object-contain" alt="logo" />
    </div>
  </div>

</template>
<style lang="scss">
@import "~/styles/main.scss";

.login-bg {
  background: url("/Login.png") no-repeat;
  background-position: center;
  background-size: 100% 100%;
  overflow: hidden;
  height: 100vh;
  color: white;
  padding: 0 1rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 1);
  }

  .logo {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

  }
}
</style>