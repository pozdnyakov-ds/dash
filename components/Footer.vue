<template>
<div>
    <v-footer padless>
        <v-col class="text-center" cols="12">
            {{ new Date().getFullYear() }} — <strong>DASH</strong>
        </v-col>
    </v-footer>  
</div>

</template>

<script setup>
    
</script>

<style lang="scss" scoped>
.v-footer {
    background-color: #263238;
    height: 50px;
    color: white;
    z-index: 9999;
}
</style>