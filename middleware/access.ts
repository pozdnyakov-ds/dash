export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore()
    var docs = userStore.docs ? userStore.docs : []
    var all_docs = []
    var page_id = -1;

    (async function() {
        const { data, pending, error, refresh } = await useFetch('/api/docs', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
        })

        const all_docs = data.value ? data.value.data : []
        for (let key in all_docs) {
            if (to.path == all_docs[key].path) {
                page_id = all_docs[key].id
            }    
        }
        
        if (page_id >= 0 && docs[page_id] && docs[page_id] == '1') {
            // console.log("ACCESS YES")
            
        } else {
            // console.log("ACCESS NO")
            const router = useRouter()
            router.push({path: "/no_access"});
            // return '/no_access'
        }
    }())

  })