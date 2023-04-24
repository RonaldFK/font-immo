<!-- eslint-disable no-unreachable -->
<!-- eslint-disable indent -->
<template>
  <div class="main-div d-flex flex-wrap h-100 flex-row justify-center">
    <v-card
      class="card card-estate ma-3 pa-3 d-flex flex-wrap flex-column justify-center"
      v-for="info in oneEstate"
      :key="info.id"
    >
      <v-card-title class="align-self-center">
        Description du bien
      </v-card-title>
      <v-card-text class="text-body-2"> {{ info.name }}</v-card-text>
      <v-card-subtitle>Statut :</v-card-subtitle>
      <v-card-text> {{ convertLabelStatus(info.statut) }}</v-card-text>
      <v-card-subtitle>Prix du bien :</v-card-subtitle>
      <v-card-text> {{ info.price }} €</v-card-text>
      <v-card-subtitle>Type du bien :</v-card-subtitle>
      <v-card-text> {{ convertLabelTypeEstate(info.type) }}</v-card-text>
      <v-card-subtitle>Localisation :</v-card-subtitle>
      <v-card-text v-if="info.location?.num">
        {{ info.location.num }} {{ info.location?.street }}
        {{ info.location?.city }}</v-card-text
      >
      <v-card-subtitle>Code postale :</v-card-subtitle>
      <v-card-text>{{ info.location?.code }}</v-card-text>
    </v-card>
    <div class="card-manager">
      <v-card
        class="card ma-3 pa-3 d-flex flex-wrap w-100 flex-column justify-center"
        v-for="info in oneEstate"
        :key="info.id"
      >
        <v-card-title class="align-self-center">
          Manager en charge
        </v-card-title>
        <v-card-text>
          {{ info.manager?.firstname }}
          {{ info.manager?.lastname }}</v-card-text
        >
        <v-card-subtitle>Mail :</v-card-subtitle>
        <v-card-text> {{ info.manager?.email }}</v-card-text>
      </v-card>
      <v-card
        class="card card-owner ma-3 pa-3 d-flex w-100 flex-wrap flex-column justify-center"
        v-for="info in oneEstate"
        :key="info.id"
      >
        <v-card-title class="align-self-center"> Propriétaire </v-card-title>

        <v-card-subtitle>Prenom :</v-card-subtitle>
        <v-card-text> {{ info.customer?.firstname }}</v-card-text>
        <v-card-subtitle>Nom :</v-card-subtitle>
        <v-card-text> {{ info.customer?.lastname }}</v-card-text>
        <v-card-subtitle>Numéro :</v-card-subtitle>
        <v-card-text> {{ info.customer?.tel }}</v-card-text>
        <v-card-subtitle>Type de client :</v-card-subtitle>
        <v-card-text> {{ info.customer?.type_of_customer }}</v-card-text>
        <v-card-subtitle>Paiment :</v-card-subtitle>
        <v-card-text> {{ info.customer?.cash_or_credit }}</v-card-text>
      </v-card>
    </div>

    <v-card
      class="card-photos ma-3 pa-3 d-flex flex-wrap flex-column justify-center overflow-x-auto"
      v-for="info in oneEstate"
      :key="info.id"
    >
      <v-img
        class="img ma-3 pa-3"
        v-for="photo in info.photos"
        :key="photo.id"
        width="350"
        aspect-ratio="16/9"
        cover
        :src="'http://localhost:3000/estate/' + id + '/photo/' + photo.name"
      >
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              color="grey-lighten-4"
              indeterminate
            ></v-progress-circular>
          </div>
        </template>
      </v-img>
    </v-card>
    <v-row align="center" justify="center">
      <v-col cols="auto" class="mb-2">
        <v-btn @click="modifyEstate">Modifier ce bien</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script src="./estateDetails.view.js"></script>

<style src="./estateDetails.css"></style>
