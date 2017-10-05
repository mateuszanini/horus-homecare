<template>
    <v-app>
        <v-toolbar dark class="teal" fixed transition="dialog-bottom-transition">
            <v-btn icon @click.native="back" dark>
                <v-icon>fa-times-circle</v-icon>
            </v-btn>
            <v-toolbar-title>Novo batimento</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark flat @click.native="back">
                    <v-icon left>fa-check-circle</v-icon> Salvar
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <br>
        <br>
        <br>
        <v-layout row wrap>
            <v-flex xs11 sm5>
                <v-dialog persistent v-model="modal" lazy full-width>
                    <v-text-field slot="activator" label="Picker in dialog" v-model="date" prepend-icon="event" readonly></v-text-field>
                    <v-date-picker v-model="date" scrollable actions>
                        <template scope="{ save, cancel }">
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat primary @click="cancel">Cancel</v-btn>
                                <v-btn flat primary @click="save">OK</v-btn>
                            </v-card-actions>
                        </template>
                    </v-date-picker>
                </v-dialog>
            </v-flex>
            <v-flex xs11 sm5>
                <v-dialog persistent v-model="modal2" lazy full-width>
                    <v-text-field slot="activator" label="Picker in dialog" v-model="time" prepend-icon="access_time" readonly></v-text-field>
                    <v-time-picker v-model="time" actions>
                        <template scope="{ save, cancel }">
                            <v-card-actions>
                                <v-btn flat primary @click="cancel">Cancel</v-btn>
                                <v-btn flat primary @click="save">Save</v-btn>
                            </v-card-actions>
                        </template>
                    </v-time-picker>
                </v-dialog>
            </v-flex>
        </v-layout>

    </v-app>
</template>

<script>
export default {
    data() {
        return {
            date: null,
            modal: false,
            time: null,
            modal2: false
        }
    },
    methods: {
        back() {
            this.$router.push('/home/beats')
        }
    }
}
</script>

<style>

</style>
