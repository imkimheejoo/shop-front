<template>
  <v-app-bar color="teal accent-4" dark>
    <v-app-bar-nav-icon @click="showCategoryTab()"></v-app-bar-nav-icon>
    <v-toolbar dark color="teal accent-4" flat>
      <router-link to="/" style="text-decoration: none">
        <v-toolbar-title class="white--text">Commerce</v-toolbar-title>
      </router-link>
      <v-autocomplete
        :search-input.sync="search"
        class="mx-4"
        flat
        hide-no-data
        hide-details
        @keyup.enter="searchByKeyword()"
        label="검색어를 입력하세요."
        solo-inverted
      ></v-autocomplete>
    </v-toolbar>
    <v-spacer></v-spacer>
    <v-btn v-if="this.isAuthenticated" to="/mypage" icon color="grey lighten-2" large>
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>

    <v-btn v-if="!this.isAuthenticated" to="/login" icon color="grey lighten-2" large>
      <v-icon>mdi-lock-open-variant</v-icon>
    </v-btn>

    <v-btn v-if="this.isAuthenticated" to="/cart" icon color="grey lighten-2" large>
      <v-badge color="green" content="6">
        <v-icon>mdi-cart-outline</v-icon>
      </v-badge>
    </v-btn>

    <v-btn v-if="this.isAuthenticated" @click="onLogout()" icon color="grey lighten-2" large>
      <v-icon>mdi-lock</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    ...mapMutations(["LOGOUT"]),
    ...mapActions(["FETCH_PRODUCTS_BY_SEARCH_KEYWORD"]),

    showCategoryTab() {
        this.$emit('showTab');
    },

    searchByKeyword() {
      this.FETCH_PRODUCTS_BY_SEARCH_KEYWORD({keyword: this.search});
      // this.$router.push(`/products/search/${this.search}`).catch(() => {});
    },

    onLogout() {
      this.LOGOUT();
      this.$router.push("/").catch(() => {});
    },
  },
};
</script>

<style scoped>
</style>