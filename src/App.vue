<template>
    <div id="app">
        <nav>
            <ul>
                <li v-for="route in routes">
                    <router-link :to="route.path ? route.path : '/'">{{ route.titulo }}</router-link>
                </li>

            </ul>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
import { routes } from './routes.js'

export default {
    name: 'app',
    data() {
        return {
            routes: routes
        }
    }
}
</script>

<style>

</style>
