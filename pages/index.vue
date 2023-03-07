<template>
    <div>
        <div v-if="pending" class="loader">
            <v-progress-circular indeterminate color="blue-grey"></v-progress-circular>
        </div>

        <h1>{{ $t('index.title') }}</h1>

                <!-- <v-container fluid style="margin: 10px 0 10px 0; padding: 0px;">
                    <v-row>
                        <v-col>
                            <v-img src="/img/pics/bangers.png" style="border-radius: 10px;" height="150" aspect-ratio="1" cover class="bg-white" />
                            <span>VRBangers</span>
                        </v-col>
                        <v-col>
                            <v-img src="/img/pics/trans.png" style="border-radius: 10px;" height="150" aspect-ratio="1" cover class="bg-white" />
                            <span>VRBTrans</span>
                        </v-col>
                        <v-col>
                            <v-img src="/img/pics/gay.png" style="border-radius: 10px;" height="150" aspect-ratio="1" cover class="bg-white" />
                            <span>VRBGay</span>
                        </v-col>
                        <v-col>
                            <v-img src="/img/pics/conk.png" style="border-radius: 10px;" height="150" aspect-ratio="1" cover class="bg-white" />
                            <span>VRConk</span>
                        </v-col>
                        <v-col>
                            <v-img src="/img/pics/blow.png" style="border-radius: 10px;" height="150" aspect-ratio="1" cover class="bg-white" />
                            <span>BlowVR</span>
                        </v-col>
                    </v-row>                    
                </v-container>     -->

                

        <v-container fluid style="margin: 10px 0 10px 0; padding: 0px;">                
            <div v-for="item in images" :key="item.id" style="display: inline-block;">
                <!-- <span>{{ item.download_url }}</span> -->
                
                <img :data-src="item.download_url == 'https://picsum.photos/id/1/5000/3333' ? '' : item.download_url" style="display: inline-block; width: 300px; height: 200px; border: 0px solid #fff; border-radius: 10px; margin: 5px;" alt="" title="" v-lazy-load>
                <!-- <v-img :src="item.download_url == 'https://picsum.photos/id/1/5000/3333' ? '' : item.download_url" v-lazy-load 
                    style="border: 0px solid #fff; border-radius: 10px; margin: 5px;"
                    height="200" aspect-ratio="1" cover class="bg-white" /> -->
            </div>
        </v-container>
        
        <!-- <iframe src="https://docs.google.com/document/d/e/2PACX-1vQNSJaBm0dGbcUsH4OHJzKWsY8vPjGeJXr4YzT-3lw8S5yx3FHvWbdHuOF23rHX9g/pub?embedded=true" style="border: 1px solid #ccc; border-radius: 10px; width: 100%; height: 720px; padding: 0; margin: 10px 0 0 0; " frameborder='0' marginheight='0' marginwidth='0'>Loading...</iframe> -->

    </div>
</template>

<script setup>
    const images = ref([])

    definePageMeta({
        middleware: ['auth','access']
    }) 

    const { data, pending, error, refresh } = await useFetch('https://picsum.photos/v2/list?page=1&limit=10', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
    })  

    if (data) {
        images.value = data.value
        console.log("IMAGES: ", images.value)
    } else {
        useNuxtApp().$toast.error('User deleting error!');
    }

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