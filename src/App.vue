<template>
    <div id="app">
        <v-card flat>
            <v-toolbar dark class="primary teal elevation-0" extended>

            </v-toolbar>
            <v-layout row>
                <v-flex xs4 offset-xs4>
                    <v-card class="card--flex-toolbar">
                        <v-card-text class="white" style="height: 400px;">
                            <div class="text-xs-center">
                                <v-btn error dark block large :loading="loading" @click.native="loader = 'loading'" :disabled="loading" class="white--text">
                                    <v-icon left dark>fa-google</v-icon>
                                    Login com Google
                                </v-btn>
                                <v-btn primary dark block large :loading="loading2" @click.native="loader = 'loading2'" :disabled="loading2" class="white--text">
                                    <v-icon left dark>fa-facebook-official</v-icon>
                                    Login com Facebook
                                </v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-card>
        <v-footer class="pa-3 teal white--text" fixed>
            <div>© {{ new Date().getFullYear() }} Horus Homecare
            </div>
        </v-footer>
    </div>
</template>

<script>

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
            right: null,
            //botão
            loader: null,
            loading: false,
            loading2: false,
        }
    },
    watch: {
        loader() {
            const l = this.loader
            this[l] = !this[l]

            setTimeout(() => (this[l] = false), 3000)

            this.loader = null
        }
    },
}
</script>

<style>
.card--flex-toolbar {
    margin-top: -64px;
}

.custom-loader {
    animation: loader 1s infinite;
    display: flex;
}

@-moz-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}

@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}

@-o-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
