<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xs12 sm6>
                <v-card color="blue-grey darken-2" class="grey--text text--darken-1">
                    <v-card-title primary-title>
                        <div class="headline">Unlimited music now</div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat dark>Listen now</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6>
                <v-list two-line subheader>
                    <v-subheader>
                        <h5>Últimas medições</h5>
                    </v-subheader>
                    <v-list-tile avatar v-for="beat in savedBeats" v-bind:key="beat.date" @click="">
                        <v-list-tile-avatar>
                            <v-icon class="grey lighten-1 white--text">fa-heartbeat</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ beat.beats }} bpm</v-list-tile-title>
                            <v-list-tile-sub-title>
                                <v-icon class="icone">fa-calendar</v-icon> {{ beat.date }} &emsp;
                                <v-icon class="icone">fa-clock-o</v-icon> {{ beat.time }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn icon ripple>
                                <v-icon color="grey lighten-1">info</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                    <div>
                        <v-btn flat>Ver mais
                        </v-btn>
                    </div>
                </v-list>
                <br>
                <br>
                <br>
            </v-flex>
        </v-layout>

        <v-btn class="teal mb-5" @click.native="createGo" dark fab fixed bottom right>
            <v-icon>fa-plus</v-icon>
        </v-btn>
        <div v-if="saved && online">
            <snackbar :context="'success'" :text="'Dados salvos com sucesso!'"></snackbar>
        </div>
        <div v-if="saved && !online">
            <snackbar :context="'info'" :text="'Dados salvos localmente. Serão sincronizados quando você estiver online!'"></snackbar>
        </div>
        <div v-if="sincronized">
            <snackbar :context="'success'" :text="'Sucesso! Dados locais foram sincronizados.'"></snackbar>
        </div>
        <v-layout row v-if="loading">
            <tela-loading></tela-loading>
        </v-layout>
    </v-container>
</template>

<script>
import Snackbar from '../../components/shared/snackbar/Snackbar.vue'
import TelaLoading from '../../components/shared/loading/TelaLoading.vue'

export default {
    data() {
        return {
        }
    },
    computed: {
        saved() {
            const saved = this.$store.getters.saved
            !this.$store.commit('clearSaved')
            return saved
        },
        sincronized() {
            const sincronized = this.$store.getters.sincronized
            !this.$store.commit('clearSincronized')
            return sincronized
        },
        online() {
            return this.$store.getters.online
        },
        loading() {
            return this.$store.getters.loading
        },
        savedBeats() {
            return this.$store.getters.getSavedBeats
        }
    },
    methods: {
        createGo() {
            this.$router.push('/create/beats')
        }
    },
    components: {
        'snackbar': Snackbar,
        'tela-loading': TelaLoading
    },
    watch: {
    },
}
</script>

<style scopped>
.icone {
    font-size: 1em !important;
    margin-top: -5px;
}
</style>
