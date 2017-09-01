<template>
    <div>
        <div v-for="btn in botao">
            <v-btn :class="btn.cor" @click.native="signInGoogle" class="white--text" large block>
                <v-icon left>{{ btn.icone }}</v-icon>
                Login com {{ btn.nome }}
            </v-btn>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase'

export default {
    props: {
        botao: {
            type: Array,
            required: true
        }
    },
    methods: {
        signInGoogle() {
            var provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function(result) {
                var token = result.credential.accessToken;
                var user = result.user;

                localStorage.setItem('user', JSON.stringify(user));

            }).catch(function(error) {
                console.log("Algo deu errado - Login");
            });

        }
    }
}
</script>

<style>

</style>
