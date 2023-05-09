<template>
    <div>
        <div v-if="pending" class="loader">
            <v-progress-circular indeterminate color="blue-grey"></v-progress-circular>
        </div>

        <h1>{{ $t('summarr_models.title') }}</h1>

        <v-card style="margin-top: 10px;">
            <v-table>
                <thead style="background-color: #eee;">
                    <tr>
                      <th class="text-left">Video Title</th>
                      <th class="text-left">Website</th>
                      <th class="text-left">Release date</th>
                      <th class="text-left">Length</th>
                      <th class="text-left">Quality</th>

                      <th class="text-left website">Website avarage view time</th>
                      <th class="text-left website">Website total view time</th>
                      <th class="text-left website">Website views for period</th>
                      <th class="text-left website">Website views total</th>
                      <th class="text-left website">Website quality for period</th>
                      </tr>
                </thead>
                <tbody>
                    <tr v-for="item in videos" :key="item.playaId">
                      <td>{{ item.title }} [{{ item.id }}]</td>
                      <td>{{ item.Website }}</td>
                      <td>{{ item.date_gmt }}</td>
                      <td>{{ item['video-duration'] }}</td>
                      <td>{{ item.qual}}</td>

                      <td>{{ item['Average view time'] }}</td>
                      <td>{{ 1 }}</td>
                      <td>{{ 1 }}</td>
                      <td>{{ 1 }}</td>
                      <td>{{ 1 }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>

        <!-- <iframe src="https://docs.google.com/document/d/e/2PACX-1vQNSJaBm0dGbcUsH4OHJzKWsY8vPjGeJXr4YzT-3lw8S5yx3FHvWbdHuOF23rHX9g/pub?embedded=true" style="border: 1px solid #ccc; border-radius: 10px; width: 100%; height: 720px; padding: 0; margin: 10px 0 0 0; " frameborder='0' marginheight='0' marginwidth='0'>Loading...</iframe> -->

    </div>
</template>

<script setup>
    const videos = ref({})

    definePageMeta({
        middleware: ['auth','access']
    }) 

    const loadVideos = async () => {
        const { data, pending, error, refresh } = await useFetch('/api/summary_video', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                //value: 'https://vrbangers.com',
                //date_start: '2022-03-20',
                //date_end: '2022-03-25'
            }
        })

        if (data.value) {
            var temp = data.value
            console.log('JSON Data: ', temp.data)
            var json = JSON.parse(temp.data.video)
            console.log('Data: ', json)
            videos.value = json
        }
        else {
            console.log('Data error!')
        }
        
        //videos.value = data && data.value ? data.value : []
    }

    //loadVideos()

</script>

<style lang="scss" scoped>
.pic {
    border: 1px solid #ccc;
    border-radius: 5px;
    display: inline-block;
    margin: 10px 10px 10px 0;
    padding: 10px;
}
.website {
    background-color: rgb(255, 204, 204);
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