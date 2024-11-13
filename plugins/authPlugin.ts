export default defineNuxtPlugin(() => {
    addRouteMiddleware(
        'auth',
        async (to) => {
            const token = localStorage.getItem('accessToken')
            const authStore = useAuthStore()
            if (!token && to.path !== '/login') {
                return navigateTo('/login')
            } else if (token && to.path == '/login') {
                return navigateTo('/')
            }

        },
        { global: true }
    )
})
