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
                        ...
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="green-darken-1"
                        variant="text"
                        @click="dialog_docs_yes"
                      >
                        Сохранить
                      </v-btn>
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

    const docs = ref({})
    const dialog_docs = ref(false)

    const show_docs = () => {
        console.log("LOAD DOCS for ", props.id)

        const { data, pending, error, refresh } = useFetch('/api/users', {
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
            docs.value = data && data.value ? JSON.parse(JSON.stringify(data.value)) : []
            docs.value = docs.value.data && docs.value.data.docs ? JSON.parse(docs.value.data.docs) : {}
            console.log("DOCS LIST: ", docs.value)

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
                action: 'users.delete',
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