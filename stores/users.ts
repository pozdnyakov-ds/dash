export const useUserStore = defineStore('user', {
    state: () => ({
        id: '',
        name: '',
        surname: '', 
        email: '',
        phone: '',
        scope: {},
        loggedIn: false
    }),
    actions: {
        setPhone(phone: string) { 
            this.phone = phone
        },
        loadAllDocs() {
            const { data, pending, error, refresh } = useFetch('/api/docs', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    action: 'docs.list',
                }
            })
            const all_docs = data && data.value && data.value?.docs ? JSON.parse(JSON.stringify(data.value?.docs)) : []
            return all_docs
        },
        loadDocs() {
            const userId = this.id
            const { data, pending, error, refresh } = useFetch('/api/users', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    action: 'users.get.docs',
                    id: userId
                }
            })
            const docs = data && data.value && data.value?.docs ? JSON.parse(JSON.stringify(data.value?.docs)) : []
            return docs.docs
        }
    },
    getters: {
        getPhone(): string { 
            return this.phone
        }
    },
    persist: true
})
