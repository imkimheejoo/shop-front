<template>
    <v-toolbar dark color="teal accent-4" flat>
        <v-toolbar-title>Commerce</v-toolbar-title>
        <!--             :search-input.sync="search" == v-model         -->
        <v-autocomplete
                :search-input.sync="search"
                class="mx-4"
                flat
                hide-no-data
                hide-details
                @keyup.enter="searchByKeyword"
                label="검색어를 입력하세요."
                solo-inverted
        ></v-autocomplete>
    </v-toolbar>
</template>

<script>
    export default {
        name: "SearchBar",
        data() {
            return {
                search: null,
            }
        },
        methods: {
            searchByKeyword() {
                this.$store.dispatch("FETCH_PRODUCTS", 'keyword', this.search)
                    .then(() => {
                        window.location.href = `http://localhost:8080/products/keyword/${this.search}`;
                    })
            }
        }
    }
</script>

<style scoped>

</style>