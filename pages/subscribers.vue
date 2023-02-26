<template>
    <div>
        <h1>{{ $t('dashboard_subscribers.title') }}</h1>
        <h4>Download lists of subscribed users for all projects</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, possimus sit. Sint saepe error a provident deleniti fuga maxime quos adipisci, consequatur dolorum amet maiores aut ipsum in numquam velit?</p>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ['auth', 'access']
    }) 
</script>

<style lang="scss" scoped>

</style>