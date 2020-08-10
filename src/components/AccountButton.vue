<template>
    <div>
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