<template>
<v-app style="background-color: #eee">
    <v-container class="fill-height">
        <v-row align-content="center" justify="center" class="fill-height">
            <slot />
        </v-row>
    </v-container>
</v-app>
</template>

<script setup>
</script>

<style scoped>
.page-enter-active, .page-leave-active {
    transition: opacity 0.3s;
}

.page-enter, .page-leave-active {
    opacity: 0;
}
</style>