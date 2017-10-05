<template>
    <v-app>
        <!-- <v-dialog v-model="dialogBeats" fullscreen transition="dialog-bottom-transition">
                                        <v-btn fab dark fixed bottom right slot="activator" class="teal mb-5">
                                            <v-icon>add</v-icon>
                                        </v-btn>
                                        <v-card>
                                            <v-toolbar dark class="teal">
                                                <v-btn icon @click.native="dialogBeats = false" dark>
                                                    <v-icon>fa-times-circle</v-icon>
                                                </v-btn>
                                                <v-toolbar-title>Novo batimento</v-toolbar-title>
                                                <v-spacer></v-spacer>
                                                <v-toolbar-items>
                                                    <v-btn dark flat @click.native="dialogBeats = false">
                                                        <v-icon left>fa-check-circle</v-icon> Salvar
                                                    </v-btn>
                                                </v-toolbar-items>
                                            </v-toolbar>
                                        </v-card>
                                    </v-dialog> -->
        <v-btn class="teal mb-5" @click.native="createGo" dark fab fixed bottom right>
            <v-icon>fa-plus</v-icon>
        </v-btn>
    </v-app>
</template>

<script>

export default {
    data() {
        return {
            // dialogBeats: false
        }
    },
    methods: {
        createGo() {
            this.$router.push('/create/beats')
        }
    }
}
</script>

<style>

</style>
