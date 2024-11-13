import { AuthService } from "../service"
import type { LoginForm, User } from "../types"

const authService = new AuthService()


export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const user = computed<User>({
        get: () => {
            return JSON.parse(localStorage.getItem('userData') || '{}') as User
        },
        set: (value: User) => {
            localStorage.setItem('userData', JSON.stringify(value))
        }
    })
    const isLoggedIn = computed(() => !!user.value.token)
    const accessToken = computed(() => user.value.token)
    const loading = ref(false)

    const hasRole = (role : string | string[])=>{
        if(!user.value.role)
          return false;
        if(Array.isArray(role))
          return role.findIndex(r=>r===user.value.role)!=-1;
        return user.value.role === role;
      }

    const login = async (form: LoginForm) => {
        try {
            loading.value = true
            const response = await authService.login(form)
            user.value = response
            localStorage.setItem('accessToken', (response as any).token)
            loading.value = false
            return response
        } catch (error) {
            console.error(error)
            throw error

        } finally {
            loading.value = false
        }
    }

    const logout = () => {
        user.value = {} as User
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userData')
        router.push('/login')
    }

    return {
        login,
        user,
        loading,
        hasRole,
        isLoggedIn,
        accessToken,
        logout
    }
})