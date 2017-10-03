<template>
    <div>
        <v-toolbar dark class="teal elevation-0" extended>
        </v-toolbar>
        <v-layout row>
            <v-flex xs10 offset-xs1 sm6 offset-sm3 lg4 offset-lg4>
                <v-card class="card--flex-toolbar white">
                    <v-card-text>
                        <div xs8 offset-xs2 sm6 offset-sm3 lg4 offset-lg4 class="text-xs-center text-sm-center text-lg-center">
                            <img src="../../../static/img/icons/icon-128x128.png" alt="Logo Horus Homecare" />
                        </div>
                        <div class="text-xs-center my-3">
                            <h4 class="teal--text">{{ appName }}</h4>
                        </div>
                        <botao-login :botao="botoesLogin" v-bind:disabled="!online"></botao-login>
                        <div v-if="online === false">
                            <snackbar :context="'error'" :text="'Você está offline e não será possível realizar o login.'"></snackbar>
                        </div>
                    </v-card-text>
                </v-card>
                <div class="text-xs-center grey--text text--lighten-1 mt-3">
                    <p>© {{ new Date().getFullYear() }} | {{ appName }}</p>
                </div>
            </v-flex>
        </v-layout>
        <v-layout row v-if="loading">
            <tela-loading></tela-loading>
        </v-layout>
    </div>
</template>

<script>
import BotaoLogin from '../../components/shared/botao/BotaoLogin.vue'
import TelaLoading from '../../components/shared/loading/TelaLoading.vue'
import Snackbar from '../../components/shared/snackbar/Snackbar.vue'

export default {
    components: {
        'botao-login': BotaoLogin,
        'tela-loading': TelaLoading,
        'snackbar': Snackbar
    },
    data() {
        return {
            titulo: 'Login',
            appName: 'Horus Homecare',
            botoesLogin: [
                {
                    nome: 'Google',
                    icone: 'fa-google',
                    cor: 'red'
                },
                // {
                //     nome: 'Facebook',
                //     icone: 'fa-facebook-official',
                //     cor: 'blue darken-3',
                // }
            ],
            online: this.$store.getters.online
        }
    },
    computed: {
        error() {
            return this.$store.getters.error
        },
        loading() {
            return this.$store.getters.loading
        }
    },
    watch: {
    },
}
</script>

<style scoped>
.card--flex-toolbar {
    margin-top: -64px;
}
</style>
