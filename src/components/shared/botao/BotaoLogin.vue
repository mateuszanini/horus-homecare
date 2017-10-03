<template>
    <div>
        <div v-for="btn in botao">
            <v-btn :class="btn.cor" @click.native="onSignin" class="white--text" large block :disabled="disabled === true">
                <v-icon left>{{ btn.icone }}</v-icon>
                Login com {{ btn.nome }}
            </v-btn>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        botao: {
            type: Array,
            required: true
        },
        disabled:{
            type: Boolean,
            required: true
        }
    },
    methods: {
        onSignin() {
            this.$store.dispatch('signUserIn')
        }
    }
}
</script>

<style>

</style>
