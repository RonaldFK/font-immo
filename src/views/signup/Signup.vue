<template>
  <div class="main-div d-flex flex-wrap h-100 flex-column justify-center">
    <div class="d-flex flex-wrap h-100 flex-row justify-center">
      <v-alert
        v-model="alert"
        border="start"
        variant="tonal"
        closable
        close-label="Close Alert"
        type="error"
        title="Message Important !"
        max-width="500"
        class="align-self-center mt-5"
      >
        Tous les champs sont obligatoirs pour une inscription
      </v-alert>

      <v-alert
        type="success"
        variant="outlined"
        v-model="accept"
        max-width="500"
        class="align-self-center mt-5"
      >
        Votre compte a été créé avec succès
      </v-alert>
    </div>
    <div class="d-flex flex-wrap h-100 flex-row justify-center">
      <v-card
        max-width="500"
        class="card w-100 ma-5 pa-5 rounded d-flex flex-column h-100 flex-wrap justify-center"
      >
        <v-card-title class="align-self-center mt-5"
          >Je demande accès</v-card-title
        >
        <v-text-field
          v-model="userToCreate.lastname"
          label="Nom"
        ></v-text-field>
        <v-text-field
          v-model="userToCreate.firstname"
          label="Prénom"
        ></v-text-field>
        <v-text-field v-model="userToCreate.email" label="Email"></v-text-field>
        <v-text-field label="login" v-model="userToCreate.login"></v-text-field>
        <v-text-field
          label="Mot de passe"
          type="password"
          v-model="userToCreate.password"
        ></v-text-field>
        <v-text-field
          v-model="userToCreate.checkPassword"
          label="Confirmation"
        ></v-text-field>
        <v-row align="center" justify="center">
          <v-col cols="auto" class="mb-2">
            <v-btn @click="sendRequestAccess">Créer mon compte</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script src="./signup.view.js"></script>
