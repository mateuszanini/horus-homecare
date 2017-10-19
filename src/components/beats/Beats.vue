<template>
    <v-app>
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
    </v-app>
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
    }
}
</script>

<style>

</style>
