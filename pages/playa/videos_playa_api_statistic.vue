<template>
    <div>
        <h1>{{ $t('videos_playa_api_statistic.title') }}</h1>
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