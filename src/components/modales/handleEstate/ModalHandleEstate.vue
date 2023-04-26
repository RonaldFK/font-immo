<template>
  <div class="main-div d-flex flex-wrap h-100 flex-column justify-center">
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
      Tous les champs sont obligatoirs
    </v-alert>

    <v-alert
      border="top"
      border-color="success"
      closable
      elevation="2"
      v-model="accept"
      max-width="500"
      class="align-self-center mt-5"
    >
      Modifié avec succès
    </v-alert>
    <div
      class="w-100 ma-5 pa-5 rounded d-flex flex-row h-100 flex-wrap justify-center"
    >
      <v-card
        max-width="500"
        class="card w-100 ma-5 pa-5 rounded d-flex flex-column h-100 flex-wrap justify-center"
      >
        <v-row align="center" justify="center" class="mb-5">
          <v-col cols="auto">
            <v-card-title>Création d'un nouveau bien</v-card-title>
          </v-col>
        </v-row>
        <v-text-field
          v-model="estateToCreate.name"
          :label="'Nom actuel: ' + currentEstate.name"
          ref="nomForm"
        ></v-text-field>
        <v-text-field
          v-model="estateToCreate.price"
          :label="'Prix actuel : ' + currentEstate.price"
        ></v-text-field>

        <v-select
          v-model="estateToCreate.type"
          :items="typeEstates"
          item-title="label"
          item-value="value"
          :label="
            'Type de bien : ' + convertLabelTypeEstate(currentEstate.type)
          "
        ></v-select>
        <v-select
          v-model="estateToCreate.statut"
          :items="status"
          item-title="label"
          item-value="value"
          :label="'Statut : ' + convertLabelStatus(currentEstate.statut)"
        >
        </v-select>
        <v-text-field
          v-model="estateToCreate.date_of_selling"
          :label="'Date de la vente: ' + currentEstate.date_of_selling"
        ></v-text-field>

        <v-file-input label="Ajouter des photos" ref="photos" multiple>
        </v-file-input>
        <v-textarea v-model="estateToCreate.bio"></v-textarea>
      </v-card>
      <v-card
        max-width="500"
        class="card w-100 ma-5 pa-5 rounded d-flex flex-column h-100 flex-wrap justify-center"
      >
        <v-row align="center" justify="center" class="mb-5">
          <v-col cols="auto">
            <v-card-title>Localisation du bien</v-card-title>
          </v-col>
        </v-row>
        <v-text-field
          v-model="locationToCreate.num"
          :label="'Numéro de rue :' + currentLocation.num"
        ></v-text-field>
        <v-text-field
          v-model="locationToCreate.street"
          :label="'Nom de rue :' + currentLocation.street"
        ></v-text-field>
        <v-text-field
          v-model="locationToCreate.city"
          :label="'Ville :' + currentLocation.city"
        ></v-text-field>
        <v-text-field
          v-model="locationToCreate.country"
          :label="'Pays :' + currentLocation.country"
        ></v-text-field>
        <v-text-field
          v-model="locationToCreate.code"
          :label="'Code :' + currentLocation.code"
        ></v-text-field>
      </v-card>
    </div>
    <div
      class="w-100 ma-5 pa-5 rounded d-flex flex-row h-100 flex-wrap justify-center"
    >
      <v-card
        max-width="500"
        class="card w-100 ma-5 pa-5 rounded d-flex flex-column h-100 flex-wrap justify-center"
      >
        <v-text-field
          prepend-icon="mdi-magnify"
          @click:prepend="searchCustomer(customerToSearch)"
          v-model="customerToSearch"
          ref="customerToSearch"
          label="Rechercher propriétaire :"
        ></v-text-field>
        <v-select
          v-model="firstFilterToSearchCustomer"
          :items="customers"
          item-title="lastname"
          item-value="lastname"
          :label="'Nom du propriétaire: ' + currentCustomer.lastname"
        >
        </v-select>
        <v-select
          v-model="estateToCreate.customer_id"
          :items="customers"
          ref="firstname"
          item-title="firstname"
          item-value="id"
          :label="'prénom: ' + currentCustomer.firstname"
        >
        </v-select>
      </v-card>
      <v-card
        max-width="500"
        class="card w-100 ma-5 pa-5 rounded d-flex flex-column h-100 flex-wrap justify-center"
      >
        <v-row align="center" justify="center" class="mb-5">
          <v-col cols="auto">
            <v-card-title>Manager en charge</v-card-title>
          </v-col>
        </v-row>
        <v-select
          v-model="estateToCreate.manager_id"
          :items="managers"
          item-title="firstname"
          item-value="id"
          :label="
            'Manager: ' +
            currentManager.firstname +
            ' ' +
            currentManager.lastname
          "
        >
        </v-select>
      </v-card>
    </div>
    <v-row align="center" justify="center">
      <v-col cols="auto" class="mb-2">
        <v-btn @click="updateEstate">Valider</v-btn>
      </v-col>
      <v-col cols="auto" class="mb-2">
        <v-btn @click="closeModal">Annuler</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script src="./handleEstate.component.js"></script>
<style scoped src="./handleEstate.css"></style>
