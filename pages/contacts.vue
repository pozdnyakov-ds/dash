<template>
    <div>
        <h1>{{ $t('contacts.title') }}</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim obcaecati sit temporibus amet, quaerat exercitationem voluptatibus veritatis sequi commodi suscipit eius aliquid ipsam nostrum nulla impedit tempora placeat vitae consequatur.</p>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ['auth']
    }) 
</script>

<style lang="scss" scoped>

</style>