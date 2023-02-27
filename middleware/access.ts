export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore()
    var page_id = -1;

    (async function() {
        
        const all_docs = userStore.loadAllDocs()
        for (let key in all_docs) {
            if (to.path == all_docs[key].path) {
                page_id = all_docs[key].id
            }    
        }

        const tempDocs = userStore.loadDocs()
        const docs = JSON.parse(tempDocs)

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