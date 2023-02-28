<template>
    <div>
        <v-app-bar color="#263238" density="compact"
    >
        <!-- <v-app-bar-nav-icon icon="mdi-view-list" @click="drawer = !drawer"></v-app-bar-nav-icon> -->
        
        <!-- <v-toolbar-title style="width: 200px; min-width: 150px;">
            <nuxt-link to="/">
                <img src="/img/logo.png" alt="Dev116 Logo" style="width: 150px; margin: 8px 0 0 0;">
            </nuxt-link>
        </v-toolbar-title> -->

        <v-spacer></v-spacer>

        <!-- <template style="display: block;">
            <v-tabs v-model="tab" color="green">
                <v-tab>
                    <nuxt-link key=0 to="/" exact>{{ $t('index.title') }}</nuxt-link>
                </v-tab>
                <v-tab>
                    <nuxt-link key=1 to="/about">{{ $t('about.title') }}</nuxt-link>
                </v-tab>
            </v-tabs>
        </template> -->

        <v-spacer></v-spacer>

        <!-- <v-icon>mdi mdi-star-outline</v-icon> -->
        <!-- <div style="color: #fff;">{{ userStore.scope }}</div> -->
        
        <client-only>
            <v-btn icon v-if="isAdmin">
                <nuxt-link to="/admin">
                    <v-icon>mdi-pound-box</v-icon>
                </nuxt-link>
            </v-btn>
        </client-only>

        <client-only>
            <v-btn icon v-if="userStore.loggedIn">
                <nuxt-link to="#">
                    <v-icon @click="logout">mdi-logout</v-icon>
                </nuxt-link>
            </v-btn>
        </client-only>
   
        <!-- <template v-if="$i18n.locale=='en'" v-slot:append>
            <v-btn @click="$i18n.locale='ru'">RU</v-btn>
        </template>
        <template v-else v-slot:append>
            <v-btn @click="$i18n.locale='en'">EN</v-btn>
        </template> -->
        
        </v-app-bar>

        <client-only>
        <v-navigation-drawer app color="#566573" :permanent="true" class="mt-5"
        style="top: 28px; width: 200px; padding-top: 10px;" v-model="drawer" text-color="white">

            <!-- {{ all_docs }} -->

            <div v-for="item in all_docs" :key="item.id">
                <v-list-item v-if="docs[item.id]">
                    <nuxt-link :to="item.path" exact class="navbar-link">
                            <div v-if="item.parent" style="margin-left: 10px;">
                                {{ item.name }}
                            </div>
                            <div v-else style="margin-top: 10px; border-bottom: 1px #ccc solid;">
                                {{ item.name }}
                            </div>
                    </nuxt-link>
                </v-list-item>
            </div> 
        </v-navigation-drawer>
        </client-only>

    </div>
</template>

<script setup>
import { computed } from 'vue'

let drawer = ref(true)
let tab = ref(null)
let all_docs = ref([])
let docs = ref([])
const userStore = useUserStore()

let isAdmin = computed({
    get() {
        if (userStore.scope && userStore.scope.admin == 1) {
            return true
        } else {
            return false
        }
    }
})

const logout = async () => {
    userStore.loggedIn = false
    userStore.id = ''
    userStore.name = ''
    userStore.surname = ''
    userStore.email = ''
    userStore.phone = ''
    userStore.scope = {}
}

const loadDocs = async () => {
    all_docs.value = await userStore.loadAllDocs()
    
    let tempJson = await userStore.loadDocs()
    const myDocs = tempJson && tempJson.length ? JSON.parse(tempJson) : []

    for (let key in all_docs.value) {
        let id = all_docs.value[key].id
        let parent = all_docs.value[key].parent

        if (myDocs[id] == 1 && all_docs.value[key].parent) {
            myDocs[all_docs.value[key].parent] = 1
        }
    }
    docs.value = reactive(myDocs)
    // console.log("loadDocs: ", docs.value)
}
loadDocs()

</script>

<style lang="scss" scoped>
.navbar-link {
    color: #fff;
    text-decoration: none;
    font-weight: normal;
    font-size: 90%;
}
a {
    font-weight: bold;
    text-decoration: none;
    color: #fff;
}  
.v-btn {
    color: #fff;
}
.v-list-item--density-default {
    min-height: 32px;
}
</style>