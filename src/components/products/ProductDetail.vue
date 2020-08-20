<template>
<v-row class="ma-5 pa-5" style="witdh:1920px; height:1080px; background-color: #008080;">
    <div >{{product.content}}</div>
</v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["product"]),
  },
};
</script>

<style>
</style>