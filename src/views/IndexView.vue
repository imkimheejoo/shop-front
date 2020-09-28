<template>
    <v-container class="mt-5">
        <v-row v-if="this.products" align="center" justify="center">
            <card
                    v-for="(product,index) in this.products.contents"
                    class="ma-2"
                    :key="index"
                    cols="12"
                    sm="4"
                    md="4"
                    xl="3"
                    :product="product"
            />
        </v-row>
        <v-row>
            <v-col class="text-center mt-5">
                <v-pagination v-model="page" :length="this.products.totalPages" total-visible="7"></v-pagination>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Card from "../components/Card";
    import {mapState, mapActions} from "vuex";

    export default {
        data() {
            return {
                page: 3,
            };
        },
        components: {
            Card,
        },
        watch: {
            page() {
                this.FETCH_PRODUCTS(this.page);
            },
        },
        computed: {
            ...mapState({
                products: state => state.products.products
            }),
        },
        methods: {
            ...mapActions(["products/FETCH_PRODUCTS"]),
        },
    };
</script>

<style>
</style>