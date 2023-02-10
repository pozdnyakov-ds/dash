export const useUserStore = defineStore('user', {
    state: () => ({
        name: '',
        surname: '', 
        email: '',
        phone: '',
        scope: [],
        loggedIn: false
    }),
    actions: {
        setPhone(phone: string) { 
            this.phone = phone
        }
    },
    getters: {
        getPhone(): string { 
            return this.phone
        }
    },
    persist: true
})
