<template>
    <div>
        <div v-if="checked"><i style="font-size: 150%; cursor: pointer;" class="mdi mdi-checkbox-marked-outline" @click="updateUserStatus"></i></div>
        <div v-else><i style="font-size: 150%; cursor: pointer;" class="mdi mdi-checkbox-blank-outline" @click="updateUserStatus"></i></div>
    </div>
</template>

<script setup>
    const props = defineProps({
        id: {
            type: String,
            required: true,
        }, 
        status: {
            type: Number,
            required: true,
        }   
    })
    
    let checked = ref(props.status ? true : false)

    const updateUserStatus = () => {
        checked.value = !checked.value
        const { data, pending, error, refresh } = useFetch('/api/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                action: 'users.status',
                id: props.id,
                status: checked.value ? 1 : 0
            }
        })
    }
</script>

<style lang="scss" scoped>

</style>