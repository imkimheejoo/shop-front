<template>
    <v-app-bar color="teal accent-4" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar dark color="teal accent-4" flat>
            <v-toolbar-title>Commerce</v-toolbar-title>
            <v-autocomplete
                    :search-input.sync="search"
                    class="mx-4"
                    flat
                    hide-no-data
                    hide-details
                    @keyup.enter="onChange"
                    label="검색어를 입력하세요."
                    solo-inverted
            ></v-autocomplete>
        </v-toolbar>
        <v-spacer></v-spacer>
    </v-app-bar>
</template>

<script>
    export default {
        name: "Navbar",
        data() {
            return {
                search: null
            }
        },
        methods: {
            onChange() {
               console.log(this.search)
            }
        }
    }
</script>

<style scoped>

</style>