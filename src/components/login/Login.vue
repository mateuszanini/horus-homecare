<template>
    <div>
        <!-- <h1>{{ titulo }}</h1> -->
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
                        <!-- <div v-for="botao in botoesLogin">
                                    <v-btn :class="botao.cor" class="white--text" large block>
                                        <v-icon left>{{ botao.icone }}</v-icon>
                                        Login com {{ botao.nome }}
                                    </v-btn>
                                </div> -->
                        <botao-login :botao="botoesLogin"></botao-login>
                    </v-card-text>
                </v-card>
                <div class="text-xs-center grey--text text--lighten-1 mt-3">
                    <p>© {{ new Date().getFullYear() }} | {{ appName }}{{ usuario }}</p>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import BotaoLogin from '../../components/shared/botao/BotaoLogin.vue'
import * as firebase from 'firebase'

export default {
    components: {
        'botao-login': BotaoLogin
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
            usuario: this.$store.getters.usuario
        }
    }
}
</script>

<style scoped>
.card--flex-toolbar {
    margin-top: -64px;
}
</style>
