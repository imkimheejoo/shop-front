<template>
    <v-card class="mx-auto mt-5 pb-3" max-width="500px">
      <v-toolbar color="teal accent-4" dark flat>
        <v-toolbar-title>Login</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field v-model="email" label="Login" name="login" prepend-icon="mdi-account" type="text"></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
          ></v-text-field>
        </v-form>

      </v-card-text>
      <v-card-actions>
        <v-btn class="mx-auto" @click="onSubmit" color="teal accent-4" dark>Login</v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: "LoginView",

  data(){
    return {
        email:'',
        password:'',
        returnPath:''
    }
  },
  methods:{
    ...mapActions([
      'LOGIN'
    ]),
    onSubmit(){
      const {email,password}=this;
      this.LOGIN({email,password})
        .then(() => {
           this.$router.push(this.returnPath).catch(() => {});
        }).catch(({response})=> {
          alert(response.data.message);
        });
    }
  },
  created(){
    this.returnPath = this.$route.query.returnPath || '/'
  }
};
</script>

<style scoped>
</style>