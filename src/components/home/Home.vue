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
                <v-list-tile @click.native="onLogout()">
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
                <v-layout row justify-center>
                    <v-dialog v-model="dialogLogout" persistent>
                        <v-card>
                            <v-card-text class="text-xs-center">
                                <span class="fa-stack fa-3x">
                                    <i class="fa fa-wifi fa-stack-1x grey--text"></i>
                                    <i class="fa fa-ban fa-stack-2x red--text text--lighten-2"></i>
                                </span>
                                <h6>Você está offline!</h6>
                                <p>Se sair do sistema conseguirá acessá-lo novamente apenas quando estiver conectado à Internet.
                                    <b>Deseja continuar?</b>
                                </p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="red--text" flat="flat" @click.native="logout(false)">Não</v-btn>
                                <v-btn class="teal--text darken-1" flat="flat" @click.native="logout(true)">Sim</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog> 
                    <bottom-bar></bottom-bar>                   
                </v-layout>                
            </v-container>
        </main>
    </v-app>
</template>


<script>
import * as firebase from 'firebase'
import BottomBar from '../../components/shared/bottomBar/BottomBar.vue'

export default {
    data() {
        return {
            drawer: null,
            user: this.$store.getters.user,
            items: [
                { title: 'Home', icon: 'dashboard' },
                { title: 'About', icon: 'question_answer' }
            ],
            mini: false,
            right: null,
            dialogLogout: false
        }
    },
    components: {
        'bottom-bar': BottomBar
    },
    computed: {
    },
    methods: {
        onLogout() {
            this.$store.dispatch('isOnline').then(
                result => {
                    if (result) {
                        this.$store.dispatch('logout')
                    } else {
                        this.dialogLogout = true
                    }
                })
        },
        logout(payload) {
            if (payload) {
                this.$store.dispatch('logout')
            }
            this.dialogLogout = false
        }
    }
}
</script>

<style scoped>

</style>
