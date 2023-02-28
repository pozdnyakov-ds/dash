export default defineNuxtRouteMiddleware(async (to, from) => {
        const userStore = useUserStore()
        var page_id = -1;

        const all_docs = await userStore.loadAllDocs()
        for (let key in all_docs) {
            if (to.path == all_docs[key].path) {
                page_id = Number(all_docs[key].id)
            }    
        }

        const tempDocs = await userStore.loadDocs()
        const docs = tempDocs && tempDocs.length && JSON.parse(tempDocs) ? JSON.parse(tempDocs) : []

        if (page_id >= 0 && docs[page_id]) {
            // console.log("ACCESS YES")
            
        } else {
            // console.log("ACCESS NO")
            const router = useRouter()
            router.push({path: "/no_access"});
        }
    
  })