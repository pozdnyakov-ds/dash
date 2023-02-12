<template>
    <div>
        <div v-if="props.right == 'owner' || props.right == 'user'">
            <div v-if="checked"><i style="font-size: 150%; color: #ccc; cursor: pointer;" class="mdi mdi-checkbox-marked-outline" @click="updateUserStatus"></i></div>
            <div v-if="!checked"><i style="font-size: 150%; color: #ccc; cursor: pointer;" class="mdi mdi-checkbox-blank-outline" @click="updateUserStatus"></i></div>
        </div>
        <div v-else>
            <div v-if="checked"><i style="font-size: 150%; cursor: pointer;" class="mdi mdi-checkbox-marked-outline" @click="updateUserStatus"></i></div>
            <div v-if="!checked"><i style="font-size: 150%; cursor: pointer;" class="mdi mdi-checkbox-blank-outline" @click="updateUserStatus"></i></div>
        </div>        
    </div>
</template>

<script setup>
    const props = defineProps({
        id: {
            type: String,
            required: true,
        }, 
        right: {
            type: String,
            required: true,
        },
        right_status: {
            type: Boolean,
            required: true,
        }   
    })
    
    let checked = ref(props.right_status ? true : false)

    const updateUserStatus = () => {
        if (props.right == 'owner' || props.right == 'user') return

        checked.value = !checked.value
        const { data, pending, error, refresh } = useFetch('/api/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                action: 'users.right',
                id: props.id,
                right: props.right,
                right_status: checked.value ? 1 : 0
            }
        })
        if (data) {
            useNuxtApp().$toast.success('Right has changed');
        } else {
            useNuxtApp().$toast.error('Right changing error!');
        }
    }
</script>

<style lang="scss" scoped>

</style>