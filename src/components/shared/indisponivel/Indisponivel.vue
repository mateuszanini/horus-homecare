<template>
    <v-container grid-list-md text-xs-center>
        <v-layout v-if="online" row wrap>
            <v-flex xs12>
                <span class="fa-stack fa-5x">
                    <i class="fa fa-stop fa-stack-2x grey--text"></i>
                    <i class="fa fa-gears fa-stack-1x white--text"></i>
                </span>
            </v-flex>
            <v-flex xs12>
                <h3 class="grey--text">Recurso em construção!</h3>
            </v-flex>
        </v-layout>
        <v-layout v-else row wrap>
            <v-flex xs12>
                <span class="fa-stack fa-5x">
                    <i class="fa fa-stop fa-stack-2x grey--text"></i>
                    <i class="fa fa-wifi fa-stack-1x white--text"></i>
                </span>
            </v-flex>
            <v-flex xs12>
                <h3 class="grey--text">Recurso indisponível offline!</h3>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            online: this.$store.getters.online
        }
    }
}
</script>

<style>

</style>
