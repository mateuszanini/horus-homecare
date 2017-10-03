<template>
    <v-bottom-nav absolute :value="true" class="transparent">
        <v-btn v-for="menu in menuBar" :value="menu.value" v-bind:class="{ 'teal--text': menu.active, 'grey--text': menu.active == false}" flat @click.native="alteraActive(), menu.active = true" class="menu-bar-item" :key="menu.value">
            <span>{{menu.name}}</span>
            <v-icon>{{menu.icon}}</v-icon>
        </v-btn>
    </v-bottom-nav>
</template>

<script>
export default {
    data() {
        return {
            menuBar: [
                {
                    name: 'Pressão',
                    value: 'pressao',
                    icon: 'fa-tachometer',
                    active: false
                },
                {
                    name: 'Batimentos',
                    value: 'batimentos',
                    icon: 'fa-heartbeat',
                    active: true
                },
                {
                    name: 'Glicose',
                    value: 'glicose',
                    icon: 'fa-tint',
                    active: false
                }
            ]
        }
    },
    methods: {
        alteraActive() {
            for(var i = 0; i < this.menuBar.length; i++){
                this.menuBar[i].active = false           
            }            
        }
    }
}
</script>

<style>

</style>
