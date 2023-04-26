<template>
  <div class="overlay">
    <div class="modal-customer">
      <v-card max-width="500" class="w-100">
        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-card-title>Modification client</v-card-title>
          </v-col>
          <v-col cols="auto">
            <v-card-title>Client numéro : {{ clientNumber }}</v-card-title>
          </v-col>
        </v-row>
        <v-text-field
          label="Prénom :"
          v-model="buildCustomer.firstname"
          ref="firstname"
        ></v-text-field>
        <v-text-field
          v-model="buildCustomer.lastname"
          ref="lastname"
          label="Nom :"
        ></v-text-field>
        <v-text-field
          v-model="buildCustomer.tel"
          ref="tel"
          label="Téléphone :"
        ></v-text-field>
        <v-card-subtitle class="text-subtitle-1">
          Type de paiement :</v-card-subtitle
        >
        <v-select
          :items="typeOfPayments"
          item-title="label"
          item-value="value"
          v-model="buildCustomer.cash_or_credit"
        >
        </v-select>
        <v-card-subtitle class="text-subtitle-1">
          Type de client :</v-card-subtitle
        >
        <v-select
          :items="typeOfClients"
          item-title="label"
          item-value="value"
          v-model="buildCustomer.type_of_customer"
          ref="clientType"
        >
        </v-select>
        <v-row align="center" justify="center">
          <v-col cols="auto" class="mb-2">
            <v-btn @click="modifyCustomer" size="x-small">Valider</v-btn>
          </v-col>
          <v-col cols="auto" class="mb-2">
            <v-btn @click="closeModal" size="x-small">Annuler</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script src="./handleCustomer.component.js"></script>
<style scoped src="./handleCustomer.css"></style>
