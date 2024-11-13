import axios from 'axios'
import { useAuthStore } from '~/views/auth/stores'
import { useAppToaster } from '../toaster/toaster'
// https://api.sadid.app/
export const baseURL = 'https://billpay-api.future-wave.co/'
const axiosIns = axios.create({
    baseURL: `${baseURL}api/`,
})

axiosIns.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore()
    config.headers = config.headers || {}
    config.headers['Accept-Language'] = 'ar'
    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : ''

    return config
})

axiosIns.interceptors.response.use(
    (response) => {
        // Check for post, put, delete methods and status 200
        if (response.status === 200) {
            if (response.config.url !== '/file/multi') {
                switch (response.config.method) {
                    case 'post':
                        useAppToaster().show(
                            'success',
                            'تمت إضافة البيانات بنجاح'
                        )
                        break
                    case 'put':
                        useAppToaster().show('success', 'تم التعديل بنجاح.')
                        break
                    case 'delete':
                        useAppToaster().show('success', 'تم حذف البيانات بنجاح')
                        break
                    default:
                        break
                }
            }
        }
        return response
    },
    (error) => {
        console.log(error)
        useAppToaster().show(
            'danger',
            'هناك خطأ ما في هذا الأمر يتطلب التحقق منه وإصلاحه'
        )
        if (error.response.status === 401) {
            localStorage.removeItem('userData')
            localStorage.removeItem('accessToken')
            useRouter().push('/login')
        }
    }
)

export default axiosIns
