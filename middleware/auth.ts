export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
    if (!userStore.loggedIn) {
        return navigateTo('/login')
    }
  })