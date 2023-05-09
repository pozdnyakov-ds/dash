<template>
    <div>
        <h1>{{ $t('summarr_video.title') }}</h1>

        <v-container style="margin-left: 0;">
            <v-row>
                <v-col style="margin-right: 10px; max-width: 200px;">
                    <client-only>
                        <v-select label="Project" 
                            :items="['VRBANGERS', 'VRBTRANS', 'VRBGAY', 'VRCONK', 'BLOWVR']"
                            v-model="project"
                            variant="outlined"
                        ></v-select>
                    </client-only>
                </v-col>
                <!-- <v-col style="margin-right: 10px;">
                    <client-only>
                        <v-select label="Quality" 
                            :items="['All', '4K', '5K', '6K', '8K', 'HD', 'HQ', 'PS']"
                            v-model="quality"
                            variant="outlined"
                        ></v-select>
                    </client-only>
                </v-col> -->
                <v-col style="margin-right: 10px; max-width: 200px;">
                    <v-text-field v-model="startDate" 
                        label="Start date" 
                        type="date" 
                        variant="outlined">
                    </v-text-field>    
                </v-col>
                <v-col style="margin-right: 20px; max-width: 200px;">
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
                <v-text-field
                    v-model="search"
                    label="Search by any words, quality and other symbols..."
                    single-line
                    hide-details
                    variant="outlined"
                    style="margin-bottom: 15px;"
                >
                </v-text-field>
                <v-data-table 
                    hover
                    dense
                    v-model:items-per-page="showBy"
                    :headers="headers"
                    :items="videos"
                    :search="search"
                    item-key="id"
                    no-data-text="No data. Please turn on VPN!"
                    class="elevation-1"
                >
                <template v-slot:headers="{ columns }">
                    <tr>
                        <template v-for="(column, index) in columns" :key="column.key">  
                            <td v-if="index < 5" style="font-size: small; padding: 10px; background-color: #eee;"><b>{{ column.title }}</b></td>
                            <td v-if="index < 10 && index >= 5" style="font-size: small; padding: 10px; background-color: rgb(255, 204, 204);"><b>{{ column.title }}</b></td>
                            <td v-if="index >= 10" style="font-size: small; padding: 10px; background-color: rgb(204, 255, 204);"><b>{{ column.title }}</b></td>
                        </template>
                    </tr>
                </template>

                <template
                    v-slot:item.date_gmt="{ item }">
                    {{ (item && item.raw && item.raw.date_gmt) ? new Date(item.raw.date_gmt).toISOString().substr(0, 10) : "No data"}}
                </template>

                </v-data-table>
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
    const search = ref('')

    const headers = [
        { title: 'Video Title', key: 'title' },
        { title: 'Website', key: 'Website' },
        { title: 'Release date', key: 'date_gmt' },
        { title: 'Length', key: 'video-duration' },
        { title: 'Quality', key: 'qual' },

        { title: 'Website avarage view time', key: 'Average view time' },
        { title: 'Website total view time', key: 'id' },
        { title: 'Website views for period', key: 'id' },
        { title: 'Website views total', key: 'id' },
        { title: 'Website quality for period', key: 'id' },

        { title: 'Playa avarage view time', key: 'id' },
        { title: 'Playa total view time', key: 'id' },
        { title: 'Playa total view time', key: 'id' },
        { title: 'Playa views total', key: 'id' },
        { title: 'Playa quality for period', key: 'id' }
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
.common {
    font-size: small; 
    padding: 10px;
    background-color: #eee;
}
.website {
    font-size: small; 
    padding: 10px;
    background-color: rgb(255, 204, 204);
}
.playa {
    font-size: small; 
    padding: 10px;
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