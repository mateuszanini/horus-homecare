<template>
    <div id="app">
        <!-- <nav>
                        <ul>
                            <li v-for="route in routes">
                                <router-link :to="route.path ? route.path : '/'">
                                    <v-icon left>{{ route.icone }}</v-icon>
                                    {{ route.titulo }}
                                </router-link>
                            </li>

                        </ul>
                    </nav> -->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    watch: {
        user(value) {
            if (value !== null && value !== undefined) {
                this.$router.push('/home')
            }else{
                this.$router.push('/')
            }
        }
    },
}
</script>

<style>

</style>
