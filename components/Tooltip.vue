<template>
    <div style="display: inline-block; color: #fff; background-color: #008000aa; padding: 5px 10px 5px 10px; border-radius: 5px;">
        {{ props.scope }}
    </div>
</template>

<script setup>
    const props = defineProps({
        scope: {
            type: Array,
            required: true,
        }   
    })

    // const color = ref()

</script>

<style lang="scss" scoped>
</style>