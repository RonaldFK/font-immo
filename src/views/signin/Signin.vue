<template>
  <div class="main-div d-flex flex-wrap h-100 flex-column justify-center">
    <div class="d-flex flex-wrap h-100 flex-row justify-center">
      <v-alert
        v-model="alert"
        border="start"
        variant="tonal"
        type="error"
        closable
        close-label="Close Alert"
        title="Login ou mot de passe incorrecte"
        max-width="500"
        class="align-self-center mt-5"
      >
      </v-alert>

      <v-alert type="success" variant="outlined" v-model="accept">
        Votre compte a été créé avec succès
      </v-alert>
    </div>
    <div
      v-if="this.$cookies.get('token') || this.$cookies.get('userId')"
      class="d-flex flex-wrap h-100 flex-row justify-center"
    >
      <v-card
        max-width="500"
        class="card w-100 ma-5 pa-5 rounded d-flex flex-column h-100 flex-wrap justify-center"
      >
        <v-card-title class="align-self-center mt-5"
          >Vous êtes déjà connecté</v-card-title
        >

        <v-row align="center" justify="center">
          <v-col cols="auto" class="mb-2">
            <v-btn @click="disconnect">Me Déconnecter</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <div class="d-flex flex-wrap h-100 flex-row justify-center" v-else>
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

<script src="./signin.view.js"></script>
