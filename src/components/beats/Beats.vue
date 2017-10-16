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
    </v-app>
</template>

<script>
import Snackbar from '../../components/shared/snackbar/Snackbar.vue'

export default {
    data() {
        return {
            online: this.$store.getters.online
        }
    },
    computed: {
        saved() {
            const saved = this.$store.getters.saved
            !this.$store.commit('clearSaved')
            return saved
        }
    },
    methods: {
        createGo() {
            this.$router.push('/create/beats')
        }
    },
    components: {
        'snackbar': Snackbar
    }
}
</script>

<style>

</style>
