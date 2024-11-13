<script setup lang="ts">
import { ref, watch } from 'vue'
import { baseURL } from '~/services/app-client/axios'
const props = withDefaults(
    defineProps<{
        modelValue?: FileList | null | string
        multiple?: boolean
        accept?: string
        urls?: string[]
        dropzone?: boolean // Add dropzone prop
    }>(),
    {
        dropzone: false,
    }
)

const emit = defineEmits(['update:modelValue', 'fileRemoved'])
const uploadedFiles = ref<FileList | null>(null)
const model = ref<FileList | null>(null)
const hasFetchedUrls = ref(false)
const hasFilesChanged = ref(false)
const isRemoved = ref(false)

watch(uploadedFiles, (newFiles) => {
    model.value = newFiles
    if (hasFilesChanged.value) {
        emit('update:modelValue', newFiles)
        hasFilesChanged.value = false
    }
})

const removeFile = (fileToRemove: File) => {
    if (uploadedFiles.value) {
        const dataTransfer = new DataTransfer()
        Array.from(uploadedFiles.value).forEach((file) => {
            if (file !== fileToRemove) {
                dataTransfer.items.add(file)
            }
        })
        uploadedFiles.value = dataTransfer.files
        isRemoved.value = true
        emit('fileRemoved')
    }
}
const isLoading = ref(false)
const fetchFilesFromUrls = async (urls: string | string[]) => {
    const urlArray = Array.isArray(urls) ? urls : [urls]
    isLoading.value = true
    const files = await Promise.all(
        urlArray.map(async (url) => {
            const response = await fetch(`${baseURL}/${url}`)
            const blob = await response.blob()
            const filename = url.split('/').pop() || 'downloaded_file'
            return new File([blob], filename, { type: blob.type })
        })
    )
    // console.log(files)
    const dataTransfer = new DataTransfer()
    files.forEach((file) => dataTransfer.items.add(file))

    uploadedFiles.value = dataTransfer.files
    isLoading.value = false
}

const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files) {
        const dataTransfer = new DataTransfer()

        if (uploadedFiles.value) {
            Array.from(uploadedFiles.value).forEach((file) => {
                dataTransfer.items.add(file)
            })
        }

        Array.from(input.files).forEach((file) => {
            dataTransfer.items.add(file)
        })

        hasFilesChanged.value = true
        uploadedFiles.value = dataTransfer.files
    }
}

watch(
    () => props.urls,
    () => {
        if (
            !hasFetchedUrls.value &&
            props.urls &&
            props.urls.length > 0 &&
            !isRemoved.value
        ) {
            fetchFilesFromUrls(props.urls)
            hasFetchedUrls.value = true // Mark the watcher as triggered
        }
    },
    { immediate: true }
)
</script>
<template>
    <div v-if="isLoading" class="w-full">
        <BaseCard rounded="md" class="p-4 md:p-6">
            <div class="flex items-center">
                <BasePlaceload class="size-10 rounded-full" />
                <div class="ms-3 grow space-y-2">
                    <BasePlaceload class="h-3 w-full rounded" />
                    <BasePlaceload class="h-3 w-[85%] rounded" />
                </div>
            </div>
        </BaseCard>
    </div>

    <BaseInputFileHeadless v-else v-slot="{ open, remove, preview, drop, files }" v-model="uploadedFiles"
        @change="handleFileChange" :multiple="props.multiple ?? false" :accept="props.accept">
        <div v-if="props.dropzone" role="button" tabindex="-1" @dragenter.stop.prevent @dragover.stop.prevent
            @drop="drop">
            <!-- Dropzone styling -->
            <div class="bg-primary-500/10 border-muted-400 p-8 dark:hover:border-[#7b8798] group cursor-pointer rounded-lg border-transparent border-[3px] border-dashed transition-all duration-300"
                tabindex="0" role="button" @click="open" @keydown.enter.prevent="open">
                <div class="text-center flex flex-col items-center" :class="!uploadedFiles?.length ? 'p-5' : ''">
                    <img src="/assets/images/Electronic-receipt-1.png" width="250px" />
                    <h4 class="text-primary-500 text-lg font-bold">
                        اسحب الملفات التي تريد رفعها
                    </h4>
                    <div>
                        <span class="text-muted-300 font-sans text-[0.7rem] font-semibold uppercase">
                            او
                        </span>
                    </div>
                    <label for="file"
                        class="text-muted-700 group-hover:text-primary-500 group-focus:text-primary-500 cursor-pointer font-sans text-sm underline underline-offset-4 transition-colors duration-300">
                        اختر الملفات
                    </label>
                </div>
            </div>
        </div>

        <div v-else class="flex items-center cursor-pointer justify-between w-full rounded-3xl border" @click="open">
            <!-- input styling -->
            <span class="text-muted-700 font-sans text-sm pr-2 transition-colors duration-300">
                اضغط هنا
            </span>
            <button class="bg-primary-500 text-white rounded-l-3xl p-3">
                رفع الصورة
            </button>
        </div>

        <ul class="mt-6 space-y-2">
            <li v-for="file in uploadedFiles" :key="file.name">
                <div
                    class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative flex items-center justify-end gap-2 rounded-xl border bg-white p-3">
                    <div class="flex items-center gap-2">
                        <div class="shrink-0">
                            <img v-if="file.type.startsWith('image')"
                                class="size-14 rounded-xl object-cover object-center" :src="preview(file).value"
                                alt="Image preview" />
                            <Icon v-else class="size-7 rounded-xl object-cover object-center" name="ph:file-duotone" />
                        </div>
                        <div class="font-sans">
                            <span class="text-muted-800 dark:text-muted-200 line-clamp-1 block text-sm">
                                {{ file.name }}
                            </span>
                            <span class="text-muted-200 block text-xs">
                                {{ formatFileSize(file.size) }}
                            </span>
                        </div>
                    </div>
                    <div class="flex-grow" />
                    <div>
                        <button
                            class="border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-900 dark:hover:border-primary-500 dark:hover:text-primary-600 relative flex size-8 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300"
                            type="button" tooltip="Remove" @click.prevent="removeFile(file)">
                            <Icon name="lucide:x" class="size-4" />
                            <span class="sr-only">Remove</span>
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    </BaseInputFileHeadless>
</template>
