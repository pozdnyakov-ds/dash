export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
    const scope: string[] = userStore.scope || []
    console.log("SCOPE: ", userStore.scope, ' -> ', scope)

    if (scope.length == 0 || !scope.includes('admin')) {
        return navigateTo('/login')
    }
  })