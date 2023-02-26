export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
    const scope = {...userStore.scope}
    console.log("ADMIN: ", scope)

    if (!scope || !scope.admin || scope.admin != 1) {
        return navigateTo('/login')
    }
  })