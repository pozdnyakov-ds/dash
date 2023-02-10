<template>
    <div>
        <h1>{{ $t('products.title') }}</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga recusandae nesciunt consequatur reprehenderit asperiores sint expedita officia consectetur aut sit. Aperiam, dolore sunt sed illum cumque soluta ipsum itaque fugiat.</p>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ['auth']
    }) 
</script>

<style lang="scss" scoped>

</style>