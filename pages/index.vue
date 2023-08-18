<template>
    <div>
        <div v-if="pending" class="loader">
            <v-progress-circular indeterminate color="blue-grey"></v-progress-circular>
        </div>

        <h1>{{ $t('home.title') }}</h1>
        
        <client-only>
            <iframe src="https://docs.google.com/document/d/1cJJv1X_ZzQQp66SPYUQJxu9-4VPidXWl/edit?usp=sharing&ouid=108659445759044868378&rtpof=true&sd=true" style="border: 1px solid #ccc; border-radius: 10px; width: 100%; height: 720px; padding: 0; margin: 10px 0 0 0; " frameborder='0' marginheight='0' marginwidth='0'>Loading...</iframe>
        </client-only>
    </div>
</template>

<script setup>
    const videos = ref({})

    definePageMeta({
        middleware: ['auth','access']
    }) 

</script>

<style lang="scss" scoped>
.pic {
    border: 1px solid #ccc;
    border-radius: 5px;
    display: inline-block;
    margin: 10px 10px 10px 0;
    padding: 10px;
}
.loader {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #CCCCCC77;
}
</style>