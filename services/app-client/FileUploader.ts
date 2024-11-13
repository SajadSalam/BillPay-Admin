import { toFormData } from 'axios'
import axiosIns from './axios'

export class FileService {
    async uploadFile(file: File | File[] | FileList) {
        const formData = new FormData()

        if (!file) return undefined

        // Check if the file is an array (like the Proxy in the screenshot) or FileList
        if (Array.isArray(file) || file instanceof FileList) {
            // Append the first file in the array or FileList
            formData.append('File', file[0])
        } else {
            // If it's a single file, append it directly
            formData.append('File', file)
        }

        // Make the API call with the formData
        const res = await axiosIns.post('/file', formData)
        return res.data
    }

    async uploadFiles(files: File[]) {
        console.log(files[0])

        if (!files) return undefined
        const formData = new FormData()
        for (let i = 0; i < files.length; i++)
            formData.append('files', files[i])
        const res = await axiosIns.post('/file/multi', formData)
        return res.data
    }
}
