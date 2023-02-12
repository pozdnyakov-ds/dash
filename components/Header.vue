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
                <v-tab>
                    <nuxt-link key=2 to="/products">{{ $t('products.title') }}</nuxt-link>
                </v-tab>
                <v-tab>
                    <nuxt-link key=3 to="/services">{{ $t('services.title') }}</nuxt-link>
                </v-tab>
                <v-tab>
                    <nuxt-link key=4 to="/contacts">{{ $t('contacts.title') }}</nuxt-link>
                </v-tab>
            </v-tabs>
        </template> -->

        <v-spacer></v-spacer>

        <!-- <v-icon>mdi mdi-star-outline</v-icon> -->
        <!-- <div style="color: #fff;">{{ userStore.scope }}</div> -->
        
        <v-btn icon v-if="isAdmin">
            <nuxt-link to="/admin">
                <v-icon>mdi-pound-box</v-icon>
            </nuxt-link>
        </v-btn>

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

        <v-navigation-drawer app color="#566573" :permanent="true" class="mt-5"
        style="top: 28px; width: 200px; padding-top: 10px;" v-model="drawer" text-color="white">

            <!-- <v-list-item style="margin-top: 10px;">
                <nuxt-link to="/" exact class="navbar-link">{{ $t('index.title') }}</nuxt-link>
            </v-list-item>

            <v-list-item>
                <nuxt-link to="/about" exact class="navbar-link">{{ $t('about.title') }}</nuxt-link>
            </v-list-item>

            <v-list-item>
                <nuxt-link to="/products" exact class="navbar-link">{{ $t('products.title') }}</nuxt-link>
            </v-list-item>

            <v-list-item>
                <nuxt-link to="/services" exact class="navbar-link">{{ $t('services.title') }}</nuxt-link>
            </v-list-item>

            <v-list-item>
                <nuxt-link to="/contacts" exact class="navbar-link">{{ $t('contacts.title') }}</nuxt-link>
            </v-list-item> -->

            <div v-for="item in docs.data" :key="item.id">
                <v-list-item>
                    <nuxt-link :to="item.path" exact class="navbar-link">
                        <div v-if="item.parent" style="margin-left: 10px;">
                            {{ item.name }}
                        </div>
                        <div v-else>
                            {{ item.name }}
                        </div>
                    </nuxt-link>
                </v-list-item>
            </div> 
        </v-navigation-drawer>
    </div>
</template>

<script setup>
let drawer = ref(true)
let tab = ref(null)
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

const logout = () => {
    userStore.loggedIn = false
    userStore.name = ''
    userStore.surname = ''
    userStore.email = ''
    userStore.phone = ''
    userStore.scope = {}
    userStore.docs = {}
}

const { data, pending, error, refresh } = useFetch('/api/docs', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
})

docs = data && data.value ? JSON.parse(JSON.stringify(data.value)) : []
// console.log("DOCS: ", docs.data);

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