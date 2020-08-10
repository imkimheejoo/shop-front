<template>
    <v-app-bar color="teal accent-4" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
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
        <v-spacer></v-spacer>

        <a href="/mypage" v-if="account">
            <v-icon icon color="grey lighten-2" large>
                mdi-account-circle
            </v-icon>
        </a>
        <a href="/logout" v-if="account">
            <v-icon icon color="grey lighten-2" large>
                mdi-lock-open-variant
            </v-icon>
        </a>

        <a href="/login" v-if="!account">
            <v-icon icon color="grey lighten-2" large>
                mdi-lock
            </v-icon>
        </a>

        <div class="text-xs-center" v-if="account">
<!--            <v-badge left>-->
<!--                <span slot="badge">6</span>-->
                <v-icon large color="grey lighten-2">mdi-cart-outline</v-icon>
<!--            </v-badge>-->

<!--            <v-badge color="red">-->
<!--                <span slot="badge">!</span>-->
                <v-icon large color="grey lighten-2">mdi-bell-ring-outline</v-icon>
<!--            </v-badge>-->
        </div>

    </v-app-bar>
</template>

<script>
    export default {
        name: "Navbar",
        data() {
            return {
                search: null,
                account: null
            }
        },
        methods: {
            searchByKeyword() {
                // todo axios
                console.log(this.search);
            }
        }
    }
</script>

<style scoped>

</style>