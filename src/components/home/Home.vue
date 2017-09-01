<template>
    <v-app id="example-2" toolbar>
        <v-navigation-drawer temporary v-model="drawer" :mini-variant.sync="mini" light overflow absolute>
            <v-list class="pa-1">
                <v-list-tile avatar tag="div">
                    <v-list-tile-avatar>
                        <img :src="user.photoURL" />
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ user.displayName }}</v-list-tile-title>
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
                <v-list-tile @click.native="sair">
                    <v-list-tile-action>
                        <v-icon>fa-power-off</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Sair</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed class="teal" dark>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Horus Homecare</v-toolbar-title>
        </v-toolbar>
        <main>
            <v-container fluid>
                <div class="title">{{ user.email }}</div>
                <!--v-router-->
            </v-container>
        </main>
    </v-app>
</template>


<script>
import * as firebase from 'firebase'

export default {
    data() {
        return {
            drawer: null,
            user: JSON.parse(localStorage.getItem('user')),
            items: [
                { title: 'Home', icon: 'dashboard' },
                { title: 'About', icon: 'question_answer' }
            ],
            mini: false,
            right: null
        }
    },
    methods: {
        sair() {
            firebase.auth().signOut().then(function() {
                localStorage.removeItem('user')
            }).catch(function(error) {
                 console.log("Algo deu errado - Sair " + error)
            });
        }
    }
}
</script>

<style scoped>

</style>
