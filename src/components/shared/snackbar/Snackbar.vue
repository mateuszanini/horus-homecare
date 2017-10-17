<template>
    <v-snackbar :timeout="timeout" top right :success="context === 'success'" :info="context === 'info'" :warning="context === 'warning'" :error="context === 'error'" :primary="context === 'primary'" :secondary="context === 'secondary'" :multi-line="mode === 'multi-line'" :vertical="mode === 'vertical'" v-model="snackbar">
        {{ text }}
        <v-btn dark flat @click.native="snackbar = false" class="white--text">Ok</v-btn>
    </v-snackbar>
</template>

<script>
export default {
    data(){
        return {     
            snackbar: true,
            timeout: 4000,
            mode: 'multi-line'
        }
    },
    props: {
        context: {
            type: String,
            required: true
        },
        text:{
            type: String,
            required: true
        }
    }
}
</script>

<style>

</style>
