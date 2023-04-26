<template>
  <div class="main-div d-flex flex-wrap h-100 flex-column justify-center">
    <!-- <div class="modal-customerr"> -->
    <v-alert
      border="top"
      border-color="success"
      closable
      elevation="2"
      v-model="accept"
      max-width="500"
      class="align-self-center mt-5"
    >
      Client créé avec succès
    </v-alert>
    <v-card
      max-width="500"
      class="card w-100 ma-5 pa-5 rounded d-flex flex-column h-100 flex-wrap justify-center align-self-center mt-5"
    >
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <v-card-title>Création d'un client</v-card-title>
        </v-col>
      </v-row>
      <v-text-field
        :rules="rules"
        v-model="buildCustomer.firstname"
        label="Prénom :"
      ></v-text-field>
      <v-text-field
        v-model="buildCustomer.lastname"
        label="Nom :"
      ></v-text-field>
      <v-text-field
        v-model="buildCustomer.tel"
        label="Téléphone :"
      ></v-text-field>
      <v-card-subtitle class="text-subtitle-1">
        Type de paiement :</v-card-subtitle
      >
      <v-select
        v-model="buildCustomer.cash_or_credit"
        :items="typeOfPayments"
        item-title="label"
        item-value="value"
      >
      </v-select>
      <v-card-subtitle class="text-subtitle-1">
        Type de client :</v-card-subtitle
      >
      <v-select
        v-model="buildCustomer.type_of_customer"
        :items="typeOfClients"
        item-title="label"
        item-value="value"
      >
      </v-select>
      <v-row align="center" justify="center">
        <v-col cols="auto" class="mb-2">
          <v-btn @click="createCustomer" size="x-small">Valider</v-btn>
        </v-col>
        <v-col cols="auto" class="mb-2">
          <v-btn @click="closeModal" size="x-small">Annuler</v-btn>
        </v-col>
      </v-row>
    </v-card>
    <!-- </div> -->
  </div>
</template>

<script src="./createCustomer.component.js"></script>
<style scoped src="./createCustomer.css"></style>
