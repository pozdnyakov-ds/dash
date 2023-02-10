<template>
    <v-app>
        <Header />
        <v-main>
            <v-container fluid>
                <slot />
            </v-container>
        </v-main>
        <Footer />
        <Progress />
    </v-app>
</template>

<script setup>
    
</script>

<style scoped>
.v-main {
    padding-left: 210px;
}
</style>