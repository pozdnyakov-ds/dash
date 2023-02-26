export const useUserStore = defineStore('user', {
    state: () => ({
        id: '',
        name: '',
        surname: '', 
        email: '',
        phone: '',
        scope: {},
        docs: [],
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
