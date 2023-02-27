<template>
    <div>
        <div v-if="checked" style="line-height: 0;"><i style="font-size: 150%; cursor: pointer;" class="mdi mdi-checkbox-marked-outline" @click="updateUserDoc"></i></div>
        <div v-else style="line-height: 0;"><i style="font-size: 150%; cursor: pointer;" class="mdi mdi-checkbox-blank-outline" @click="updateUserDoc"></i></div>
    </div>
</template>

<script setup>
    const props = defineProps({
        user_id: {
            type: String,
            required: true,
        }, 
        id: {
            type: Number,
            required: true,
        }, 
        status: {
            type: Number,
            required: true,
        }   
    })
    
    let checked = ref(props.status ? true : false)

    const updateUserDoc = () => {
        if (props.id == 0) return

        checked.value = !checked.value
        // console.log("CHECKBOX: ", props)

        const { data, pending, error, refresh } = useFetch('/api/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                action: 'users.docs.update',
                user_id: props.user_id,
                id: props.id,
                status: checked.value ? 1 : 0
            }
        })
        if (data) {
            useNuxtApp().$toast.success('Document status has changed');
        } else {
            useNuxtApp().$toast.error('Document status changing error!');
        }

    }
</script>

<style lang="scss" scoped>

</style>