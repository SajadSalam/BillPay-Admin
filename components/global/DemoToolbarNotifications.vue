<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
</script>

<template>
  <div class="group  z-20 inline-flex items-center justify-center ">
    <Menu v-slot="{ close }" as="div" class="relative  z-20 size-9 text-left z-100">
      <MenuButton as="div">
        <button type="button"
          class="group-hover:ring-muted-200 dark:group-hover:ring-muted-700 dark:ring-offset-muted-900 inline-flex size-9 items-center justify-center rounded-full ring-1 ring-transparent transition-all duration-300 group-hover:ring-offset-4">
          <span
            class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 flex size-9 items-center justify-center rounded-full border bg-white">
            <Icon name="hugeicons:notification-03" class="text-muted-400 size-5" />
          </span>
        </button>
      </MenuButton>

      <Transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <MenuItems
          class="divide-muted-100 border-muted-200 dark:divide-muted-700 dark:border-muted-700 dark:bg-muted-800 absolute end-0 mt-2 w-72 origin-top-right divide-y rounded-md border bg-white shadow-lg focus:outline-none">
          <div class="p-4">
            <div class="relative flex items-center justify-between">
              <h4 class="font-heading text-muted-500 dark:text-muted-200 text-xs uppercase">
                الإشعارات
              </h4>
              <NuxtLink to="#" class="font-alt text-primary-500 text-sm font-semibold" @click.passive="close">
                عرض الكل
              </NuxtLink>
            </div>
          </div>
          <div class="p-4">
            <MenuItem v-for="i in 5" :key="i" v-slot="{ active }" as="div">
            <NuxtLink to="#"
              class="group flex w-full items-center rounded-md p-2 text-sm transition-colors duration-300" :class="[
                active
                  ? 'bg-muted-100 dark:bg-muted-700 text-primary-500'
                  : 'text-muted-500',
              ]" @click.passive="close">
              <div class="relative inline-flex size-9 items-center justify-center rounded-full">
                <img src="/public/logo.png"
                  class="max-w-full rounded-full object-cover shadow-sm dark:border-transparent" alt="">
              </div>
              <div class="ms-2">
                <h6 class="font-heading text-muted-800 text-xs font-semibold leading-tight dark:text-white">
                  حسين علي
                  <span class="text-muted-500 dark:text-muted-400 font-normal">
                    ترك تعليق
                  </span>
                </h6>
                <p class="text-muted-400 font-sans text-xs">
                  قبل ساعة واحدة
                </p>
              </div>
            </NuxtLink>
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  </div>
</template>
