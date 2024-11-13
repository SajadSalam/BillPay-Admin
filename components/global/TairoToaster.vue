<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        title?: string
        message?: string
        color?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'muted'
        icon?: string
        closable?: boolean
    }>(),
    {
        title: undefined,
        message: undefined,
        color: 'muted',
        icon: undefined,
    }
)

const state = useNinjaToasterState()
const { percent, closeIn, endAt } = useNinjaToasterProgress()

const wrapperClasses = computed(() => {
    switch (props.color) {
        case 'primary':
            return 'dark:border-primary-800 border-primary-200'
        case 'success':
            return 'dark:border-success-800 border-success-200'
        case 'danger':
            return 'dark:border-danger-800 border-danger-200'
        case 'warning':
            return 'dark:border-warning-800 border-warning-200'
        case 'info':
            return 'dark:border-info-800 border-info-200'
        case 'muted':
        default:
            return 'dark:border-muted-800 border-muted-200'
    }
})
const progressClasses = computed(() => {
    switch (props.color) {
        case 'primary':
            return 'bg-primary-200 dark:bg-primary-900'
        case 'success':
            return 'bg-[#01E17B]'
        case 'danger':
            return 'bg-[#F04349]'
        case 'warning':
            return 'bg-warning-200 dark:bg-warning-900'
        case 'info':
            return 'bg-info-200 dark:bg-info-900'
        case 'muted':
        default:
            return 'bg-muted-200 dark:bg-muted-900'
    }
})
const iconBgClasses = computed(() => {
    switch (props.color) {
        case 'primary':
            return 'bg-primary-50 dark:bg-primary-700'
        case 'success':
            return 'bg-success-50 dark:bg-success-700'
        case 'danger':
            return 'bg-danger-50 dark:bg-danger-700'
        case 'warning':
            return 'bg-warning-50 dark:bg-warning-700'
        case 'info':
            return 'bg-info-50 dark:bg-info-700'
        case 'muted':
        default:
            return 'bg-muted-50 dark:bg-muted-700'
    }
})
const iconClasses = computed(() => {
    switch (props.color) {
        case 'primary':
            return 'text-primary-400 dark:text-primary-50'
        case 'success':
            return 'text-success-50 bg-success-700 shadow-onsuccess'
        case 'danger':
            return 'text-danger-50 bg-danger-700 shadow-ondanger'
        case 'warning':
            return 'text-warning-400 dark:text-warning-50'
        case 'info':
            return 'text-info-400 dark:text-info-50'
        case 'muted':
        default:
            return 'text-muted-400 dark:text-muted-50'
    }
})
</script>

<template>
    <BaseCard
        dir="ltr"
        class="!bg-primary-900 pointer-events-auto relative !z-[12000] flex !border-0 shadow-md overflow-hidden focus-within:!border-0"
        :class="wrapperClasses"
    >
        <div class="absolute inset-x-0 bottom-0 h-1">
            <div
                class="h-1 rounded-es-lg"
                :class="progressClasses"
                :style="{
                    width: `${percent * 100}%`,
                }"
            />
        </div>

        <div v-if="props.closable" class="absolute end-1 top-1">
            <BaseButtonClose @click="state.close" class="!text-muted-50 hover:!bg-muted-300"/>
        </div>

        <div
            v-if="props.icon"
            class="flex w-16 items-center justify-center rounded-s-lg"
        >
            <Icon
                :name="props.icon"
                class="size-8 border-4 border-[#303746] rounded-full p-1 rounded-full"
                :class="iconClasses"
            />
        </div>
        <div
            class="text-muted-50 text-md text-right min-w-[220px] max-w-[368px] max-h-[100px] py-2 pe-10 ps-8"
        >
            <span
                v-if="props.title"
                class="font-bold text-xl font-heading maw-w-lg block truncate"
            >
                {{ props.title }}
            </span>
            <span
                v-if="props.message"
                class="!text-muted-200 font-normal text-md whitespace-pre-wrap"
            >
                {{ props.message }}
            </span>
        </div>
    </BaseCard>
</template>