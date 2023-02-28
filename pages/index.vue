<template>
    <div>
        <h1>{{ $t('index.title') }}</h1>
        <p>Statistics information for VRB projects</p>

                <v-container fluid style="margin: 10px 0 10px 0; padding: 0px;">
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
                </v-container>    

        <iframe src="https://docs.google.com/document/d/e/2PACX-1vQNSJaBm0dGbcUsH4OHJzKWsY8vPjGeJXr4YzT-3lw8S5yx3FHvWbdHuOF23rHX9g/pub?embedded=true" style="border: 1px solid #ccc; border-radius: 10px; width: 100%; height: 720px; padding: 0; margin: 10px 0 0 0; " frameborder='0' marginheight='0' marginwidth='0'>Loading...</iframe>
    </div>
</template>

<script setup>
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

</style>