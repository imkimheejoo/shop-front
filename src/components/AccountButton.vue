<template>
    <div>
        <router-link to="/mypage" v-if="account">
            <v-icon icon color="grey lighten-2" large>
                mdi-account-circle
            </v-icon>
        </router-link>

        <a href="/logout" v-if="account">
            <v-icon icon color="grey lighten-2" large>
                mdi-lock-open-variant
            </v-icon>
        </a>

        <router-link to="/login" v-if="!account">
            <v-icon icon color="grey lighten-2" large>
                mdi-lock
            </v-icon>
        </router-link>

        <div class="text-xs-center" v-if="account">
            <router-link to="/cart">
                <!--            <v-badge left>-->
                <!--                <span slot="badge">6</span>-->
                <v-icon large color="grey lighten-2">mdi-cart-outline</v-icon>
                <!--            </v-badge>-->
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AccountButton",
        data() {
            return {
                account: null
            }
        }
    }
</script>

<style scoped>

</style>