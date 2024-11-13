<script setup lang="ts">
import { useAuthStore } from './views/auth/stores';

const app = useAppConfig()

// global meta information can be added to the head
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - ${app.tairo?.title}`
      : `${app.tairo?.title}`
  },
  htmlAttrs: {
    lang: 'ar',
    dir: 'rtl',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/img/favicon.png',
    },
  ],
})


const router = useRouter()
const { isLoggedIn } = useAuthStore()
router.beforeEach((to, from, next) => {
  // console.log('to', to);

  if (to.name !== 'login' && !isLoggedIn) {
    next({ name: 'login' })
  } else {
    next()
  }

})
if (!isLoggedIn) {
  router.push({
    name: 'login'
  })
}

onMounted(() => {
  const color = localStorage.getItem('nuxt-color-mode')
  if (!color || color != 'light') {
    localStorage.setItem('nuxt-color-mode', 'light')
    window.location.reload()
  }
})

</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator color="rgb(var(--color-primary-500))" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<style lang="scss">
@import './styles/main.scss';
</style>