<template>
  <div class="main-div d-flex flex-wrap h-100 flex-column justify-center">
    <div class="d-flex flex-wrap h-100 flex-row justify-center">
      <v-alert
        v-model="alert"
        border="start"
        variant="tonal"
        closable
        close-label="Close Alert"
        color="deep-purple-accent-4"
        title="Message Important !"
        max-width="500"
        class="align-self-center mt-5"
      >
        Tous les champs sont obligatoirs pour une inscription
      </v-alert>

      <v-alert type="success" variant="outlined" v-model="accept">
        Votre compte a été créé avec succès
      </v-alert>
    </div>
    <div class="d-flex flex-wrap h-100 flex-row justify-center">
      <v-card
        max-width="500"
        class="card w-100 ma-5 pa-5 rounded d-flex flex-column h-100 flex-wrap justify-center"
      >
        <v-card-title class="align-self-center mt-5"
          >J'ai un compte</v-card-title
        >
        <v-text-field label="login" v-model="userToLog.login"></v-text-field>
        <v-text-field
          label="Mot de passe"
          type="password"
          v-model="userToLog.password"
        ></v-text-field>
        <v-row align="center" justify="center">
          <v-col cols="auto" class="mb-2">
            <v-btn @click="sendRequestLogin">Me connecter</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  props: {
    msg: String,
  },
  data() {
    return {
      accept: false,
      acceptLogin: false,
      alert: false,
      baseUrl: 'http://localhost:3000',
      userToCreate: {
        firstname: '',
        lastname: '',
        email: '',
        login: '',
        password: '',
        checkPassword: '',
      },
      userToLog: { login: '', password: '' },
    };
  },
  methods: {
    async sendRequestLogin(e) {
      e.preventDefault();

      try {
        const response = await fetch(`${this.baseUrl}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
          body: JSON.stringify(this.userToLog),
        });
        this.userToLog = {};
        const result = await response.json();
        this.$cookies.set('token', result.tokenUser.token);
        this.$cookies.set('userId', result.userId);
        console.log('coockie : ', result);
        if (response.status === 200) {
          this.$router.push('/estate');
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
