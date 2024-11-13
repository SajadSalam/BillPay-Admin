<script setup lang="ts">
interface Props {
    title: string
    total: number
    statPercent: number
    color: string
    icon: string
    iconColor: string
}
const props = defineProps<Props>()
const formattedTotal = new Intl.NumberFormat().format(props.total)
const iconClasses = computed(() => {
    switch (props.iconColor) {
        case 'primary':
            return 'text-primary-500 border-primary-500'
        case 'success':
            return 'text-success-500 border-success-500'
        case 'danger':
            return 'text-danger-500 border-danger-500'
        case 'warning':
            return 'text-warning-500 border-warning-500'
        case 'info':
            return 'text-info-500 border-info-500'
        case 'muted':
        default:
            return 'text-muted-500 border-muted-500'
    }
})

const percentClasses = computed(() => {
    switch (props.color) {
        case 'primary':
            return 'text-primary-500 border-primary-500'
        case 'success':
            return 'text-success-500 border-success-500'
        case 'danger':
            return 'text-danger-500 border-danger-500'
        case 'warning':
            return 'text-warning-500 border-warning-500'
        case 'info':
            return 'text-info-500 border-info-500'
        case 'muted':
        default:
            return 'text-muted-500 border-muted-500'
    }
})
</script>

<template>
    <BaseCard color="default" rounded="lg" class="p-6 gap-3 flex items-start">
        <Icon
            :name="props.icon"
            class="size-9 mt-2 border rounded-full p-1.5"
            :class="iconClasses"
        />
        <div class="flex flex-col">
            <span class="text-sm font-medium text-muted-500">
                {{ props.title }}
            </span>
            <span class="font-bold text-2xl"> {{ formattedTotal }}</span>
            <div
                class="rounded-3xl border py-1 px-3 text-sm"
                :class="percentClasses"
            >
                <Icon
                    :name="
                        props.color === 'success'
                            ? 'ph:arrow-up-left'
                            : 'ph:arrow-down-left'
                    "
                />
                <span>
                    {{
                        `${props.color === 'success' ? '+' : '-'} ${
                            props.statPercent
                        }% / شهريا`
                    }}
                </span>
            </div>
        </div>
    </BaseCard>
</template>
