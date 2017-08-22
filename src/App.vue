<template>
    <div id="app">
        <v-app id="example-2" toolbar>
            <v-navigation-drawer temporary v-model="drawer" :mini-variant.sync="mini" light overflow absolute>
                <v-list class="pa-1">
                    <v-list-tile avatar tag="div">
                        <v-list-tile-avatar>
                            <img src="https://lh3.googleusercontent.com/2IB45LAqrh2duE_5hC9_gARcpA2P2Ee9DZiuDplD6uptqpsaEtbaa9ohgIpMG8b49PyCJ_2kwnW71A=w1920-h1080-rw-no" />
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>Mateus Zanini</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn icon dark @click.native.stop="mini = !mini">
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
                <v-list class="pt-0" dense>
                    <v-divider></v-divider>
                    <v-list-tile v-for="item in items" :key="item.title">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
            <v-toolbar fixed class="teal" dark>
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-toolbar-title>{{ titulo }}</v-toolbar-title>
            </v-toolbar>
            <main>
                <v-container fluid>
                    <v-list>
                        <v-list-tile v-for="tecnologia in tecnologias" v-bind:key="tecnologia">
                            <v-list-tile-action>
                                <v-icon class="teal--text">arrow_right</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="tecnologia"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                    <!--v-router-->
                </v-container>
            </main>
        </v-app>
    </div>
</template>

<script>
// import Hello from './components/Hello'

export default {
    name: 'app',
    data() {
        return {
            drawer: null,
            titulo: 'Horus Homecare',
            items: [
                { title: 'Home', icon: 'home' },
                { title: 'Sair', icon: 'power_off' }
            ],
            tecnologias: ['PWA', 'VueJS', 'Vuetify', 'VueFire', 'Firebase'],
            mini: false,
            right: null
        }
    },
    components: {
        // Hello
    }
}
</script>

<style>

</style>
