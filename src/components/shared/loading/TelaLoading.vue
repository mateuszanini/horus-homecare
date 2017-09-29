<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
            <v-card id="telaLoading" class="text-xs-center">
                <v-progress-circular indeterminate v-bind:size="75" v-bind:width="5" class="white--text" id="loader"></v-progress-circular>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            dialog: true
        }
    }
}
</script>

<style scoped>
#telaLoading {
    background-color: rgba(0, 0, 0, 0.8);
}

#loader {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
}
</style>
