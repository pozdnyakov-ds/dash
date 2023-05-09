<template>
    <div>
        <h1>{{ $t('summarr_video.title') }}</h1>

        <v-container style="margin-left: 0;">
            <v-row>
                <v-col style="margin-right: 10px;">
                    <client-only>
                        <v-select label="Project" 
                            :items="['VRBANGERS', 'VRBTRANS', 'VRBGAY', 'VRCONK', 'BLOWVR']"
                            v-model="project"
                            variant="outlined"
                        ></v-select>
                    </client-only>
                </v-col>
                <v-col style="margin-right: 10px;">
                    <client-only>
                        <v-select label="Quality" 
                            :items="['All', '4K', '5K', '6K', '8K', 'HD', 'HQ', 'PS']"
                            v-model="quality"
                            variant="outlined"
                        ></v-select>
                    </client-only>
                </v-col>
                <v-col style="margin-right: 10px;">
                    <v-text-field v-model="startDate" 
                        label="Start date" 
                        type="date" 
                        variant="outlined">
                    </v-text-field>    
                </v-col>
                <v-col style="margin-right: 20px;">
                    <v-text-field v-model="endDate" 
                        label="End date" 
                        type="date" 
                        variant="outlined">
                    </v-text-field>
                </v-col>
            </v-row> 
        </v-container>           

        <v-card style="margin-top: 10px;">
            <client-only>
                <v-data-table 
                    v-model:items-per-page="showBy"
                    :headers="tableHeaders"
                    :items="videos"
                    item-title="title"
                    item-value="id"
                    no-data-text="No data"
                ></v-data-table>
            </client-only>
        </v-card>

        <Progress></Progress>

    </div>
</template>

<script setup>
    import { VDataTable } from 'vuetify/labs/VDataTable'

    const indexStore = useIndexStore()
    const videos = ref([])

    const now = new Date()
    const before = new Date()
    before.setDate(now.getDate()-7)
    const startDate = ref(before.toISOString().substr(0, 10))
    const endDate = ref(now.toISOString().substr(0, 10))

    const showBy = ref(10)
    const project = ref('VRBANGERS')
    const quality = ref('All')

    const tableHeaders = [
        { title: 'Video Title', key: 'title' },
        { title: 'Website', key: 'Website' },
        { title: 'Release date', key: 'date_gmt' },
        { title: 'Length', key: 'video-duration' },
        { title: 'Quality', key: 'qual' },

        { title: 'Website avarage view time', key: 'Average view time', class: 'website' },
        // { title: 'Website total view time', key: '' },
        // { title: 'Website views for period', key: '' },
        // { title: 'Website views total', key: '' },
        // { title: 'Website quality for period', key: '' },

        // { title: 'Playa avarage view time', key: '' },
        // { title: 'Playa total view time', key: '' },
        // { title: 'Playa total view time', key: '' },
        // { title: 'Playa views total', key: '' },
        // { title: 'Playa quality for period', key: '' }
    ]

    definePageMeta({
        middleware: ['auth','access']
    }) 

    // SHOWBY
    watch(showBy, (newValue) => {
      console.log('ShowBy: ', newValue)
      loadVideos()
    })

    // CHANGE PROJECT
    watch(project, (newValue) => {
      console.log('Project: ', newValue)
      loadVideos()
    })

    // CHANGE QUALITY
        watch(quality, (newValue) => {
      console.log('Quality: ', newValue)
      loadVideos()
    })

    // CHANGE START DATE
    watch(startDate, (newValue) => {
      console.log('Start Date: ', newValue)
      loadVideos()
    })

    // CHANGE END DATE
    watch(endDate, (newValue) => {
      console.log('End Date: ', newValue)
      loadVideos()
    })

    const loadVideos = async () => {
        videos.value = []
        indexStore.progress = true

        const { data, pending, error, refresh } = await useFetch('/api/summary_video', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                project: project.value,
                date_start: startDate.value,
                date_end: endDate.value
            }
        })

        indexStore.progress = false
        if (data.value) {
            var temp = data.value
            var json = JSON.parse(temp.data.video)
            videos.value = json
        }
        else {
            console.log('Data error!')
        }
    }

    loadVideos()

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
.playa {
    background-color: rgb(204, 255, 204);
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