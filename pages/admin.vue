<template>
    <div>
        <h1>{{ $t('admin.title') }}</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores reiciendis doloremque earum neque fugiat delectus veniam, iure et tempora temporibus fugit laborum nostrum odit blanditiis officiis at velit dolores commodi.</p>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ['auth','admin']
    })    
</script>

<style lang="scss" scoped>

</style>