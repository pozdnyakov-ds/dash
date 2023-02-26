<template>
    <div>
        <v-btn @click="show_docs">
            Docs Rights
        </v-btn>

        <client-only>
            <v-row justify="center" style="margin: 0px;">
                <v-dialog v-model="dialog_docs" persistent width="auto">
                  <v-card>
                    <v-card-title class="text-h5">
                      Список документов
                    </v-card-title>
                    <v-card-text>
                        <!-- {{ docs }} -->
                        <div v-for="doc in all_docs.data" :key="doc.id" style="vertical-align: top;">
                            <CheckboxDoc :id="doc.id" :user_id="props.id" :status="docs[doc.id] ? 1 : 0" style="display: inline-block; margin-right: 7px;"></CheckboxDoc>
                            <div v-if="doc.parent" style="display: inline-block;">&nbsp;&nbsp;</div>
                            <div style="display: inline-block;">{{doc.name}}</div>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <!-- <v-btn
                        color="green-darken-1"
                        variant="text"
                        @click="dialog_docs_yes"
                      >
                        Сохранить
                      </v-btn> -->
                      <v-btn
                        color="green-darken-1"
                        variant="text"
                        @click="dialog_docs_no"
                      >
                        Закрыть
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
            </v-row>
        </client-only> 
    </div>
</template>

<script setup>
    const props = defineProps({
            id: {
                type: String,
                required: true,
            }, 
        })

    const docs = ref([])
    const all_docs = ref([])
    const dialog_docs = ref(false)

    const loadAllDocs = async () => {
        const { data, pending, error, refresh } = await useFetch('/api/docs', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
        })
        all_docs.value = data && data.value ? JSON.parse(JSON.stringify(data.value)) : []
        console.log("ALL DOCS: ", all_docs.value.data)
    }

    const show_docs = async() => {
        loadAllDocs()
    
        const { data, pending, error, refresh } = await useFetch('/api/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                action: 'users.get.docs',
                id: props.id
            }
        })
        if (data) {
            // Show modal list
            docs.value = data && data.value && data.value.data ? JSON.parse(data.value.data.docs) : []
            console.log("LIST: ", docs.value)

            //all_docs.value.forEach((doc) => {
            // for (let i = 0; i < all_docs.value.length; i++) {    
            //     console.log("ITEM: ", all_docs.value[i])
            // }
            dialog_docs.value = true

        } else {
            useNuxtApp().$toast.error('Docs list error!');
        }
    }

    const dialog_docs_yes = () => {
        dialog_docs.value = false

        const { data, pending, error, refresh } = useFetch('/api/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                action: 'users.update',
                id: props.id
            }
        })  

        if (data) {
            useNuxtApp().$toast.success('Docs has updated');
        } else {
            useNuxtApp().$toast.error('Docs updating error!');
        }

    }

    const dialog_docs_no = () => {
        dialog_docs.value = false
    }

</script>

<style lang="scss" scoped>

</style>