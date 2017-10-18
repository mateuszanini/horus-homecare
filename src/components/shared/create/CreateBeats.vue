<template>
    <v-app>
        <v-toolbar dark class="teal" fixed transition="dialog-bottom-transition">
            <v-btn icon @click.native="back" dark>
                <v-icon>fa-times-circle</v-icon>
            </v-btn>
            <v-toolbar-title>Novo batimento</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark flat @click.native="saveBeats">
                    <v-icon left>fa-check-circle</v-icon> Salvar
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <br>
        <br>
        <br>
        <v-card flat>
            <v-container fluid>
                <v-layout row>
                    <v-flex xs12 sm4 offset-sm4>
                        <v-dialog persistent v-model="modal" lazy full-width>
                            <v-text-field slot="activator" label="Data" v-model="date" prepend-icon="fa fa-calendar" readonly></v-text-field>
                            <v-date-picker v-model="date" scrollable actions locale="pt-BR">
                                <template scope="{ save, cancel }">
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn flat @click="cancel">Cancelar</v-btn>
                                        <v-btn flat class="teal--text" @click="save">OK</v-btn>
                                    </v-card-actions>
                                </template>
                            </v-date-picker>
                        </v-dialog>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12 sm4 offset-sm4>
                        <v-dialog persistent v-model="modal2" lazy full-width>
                            <v-text-field slot="activator" label="Horário" v-model="time" prepend-icon="fa fa-clock-o" readonly></v-text-field>
                            <v-time-picker v-model="time" scrollable actions format="24hr">
                                <template scope="{ save, cancel }">
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn flat @click="cancel">Cancelar</v-btn>
                                        <v-btn flat class="teal--text" @click="save">OK</v-btn>
                                    </v-card-actions>
                                </template>
                            </v-time-picker>
                        </v-dialog>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12 sm4 offset-sm4>
                        <v-text-field v-model="beats" label="Batimentos" prepend-icon="fa icon fa-heartbeat" suffix="bpm" color="teal"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
        <v-layout row v-if="loading">
            <tela-loading></tela-loading>
        </v-layout>
    </v-app>
</template>

<script>
import TelaLoading from '../loading/TelaLoading.vue'

export default {
    data() {
        return {
            date: null,
            modal: false,
            time: null,
            modal2: false,
            beats: null
        }
    },
    methods: {
        back() {
            this.$router.push('/home/beats')
        },
        saveBeats() {
            this.$store.commit('setLoading', true)
            this.$store.dispatch('isOnline')

            this.$store.commit('setNewBeatDate', this.date)
            this.$store.commit('setNewBeatTime', this.time)
            this.$store.commit('setNewBeatBeats', this.beats)

            this.$store.dispatch('saveBeats')

            this.$router.push('/home/beats')

        }
    },
    components: {
        'tela-loading': TelaLoading
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        }
    }
}
</script>

<style scopped>
.picker__title {
    background-color: #009688 !important;
}
</style>
