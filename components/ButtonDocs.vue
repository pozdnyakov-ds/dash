<template>
    <div>
        <v-btn @click="dialog_docs">
            Docs Rights
        </v-btn>
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

    const dialog_docs = () => {
        console.log("LOAD DOCS for ", props.id, docs.value)
    }

</script>

<style lang="scss" scoped>

</style>