<template>
    <v-app-bar color="teal accent-4" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <SearchBar></SearchBar>
        <v-spacer></v-spacer>
        <AccountButton></AccountButton>
    </v-app-bar>
</template>

<script>
    import SearchBar from "@/components/SearchBar";
    import AccountButton from "@/components/AccountButton";

    export default {
        name: "Navbar",
        components: {AccountButton, SearchBar},
    }
</script>

<style scoped>

</style>