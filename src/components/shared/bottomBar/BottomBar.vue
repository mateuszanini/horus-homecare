<template>
    <v-bottom-nav :value="true" class="white">
        <v-btn v-for="menu in menuBar" :value="menu.value" v-bind:class="{ 'teal--text': menu.active, 'grey--text': menu.active == false}" flat @click.native="alteraActive(menu.value), menu.active = true" class="menu-bar-item" :key="menu.value">
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
                    value: 'pressure',
                    icon: 'fa-tachometer',
                    active: false
                },
                {
                    name: 'Batimentos',
                    value: 'beats',
                    icon: 'fa-heartbeat',
                    active: true
                },
                {
                    name: 'Glicose',
                    value: 'glucose',
                    icon: 'fa-tint',
                    active: false
                }
            ]
        }
    },
    methods: {
        alteraActive(payload) {
            for (var i = 0; i < this.menuBar.length; i++) {
                this.menuBar[i].active = false
            }
            this.$router.push('/home/' + payload)
        }
    }
}
</script>

<style>

</style>
