<template>
  <div class="main-div">
    <div class="d-flex h-100 flex-wrap justify-center" v-if="data">
      <v-card
        class="card-estate ma-5 pa-5 rounded d-flex flex-column flex-wrap justify-center"
        v-for="estate in estates"
        :key="estate.id"
      >
        <v-card-title class="align-self-center text-blue-grey-darken-1">{{
          estate.name
        }}</v-card-title>
        <v-card-subtitle class="text-teal-darken-1">Prix :</v-card-subtitle>
        <v-card-text> {{ estate.price }}</v-card-text>
        <v-card-subtitle class="text-teal-darken-1"
          >Type du bien :</v-card-subtitle
        >
        <v-card-text> {{ estate.type }}</v-card-text>

        <v-row align="center" justify="center" class="w-100">
          <!-- <v-img
            class="img ma-3 pa-3"
            width="350"
            height="300"
            aspect-ratio="16/9"
            cover
            :src="
              'http://localhost:3000/estate/' +
              estate.id +
              '/photo/' +
              estate.photos[0]?.name
            "
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                  color="grey-lighten-4"
                  indeterminate
                ></v-progress-circular>
              </div>
            </template>
          </v-img> -->
          <v-carousel width="350" height="300">
            <v-carousel-item
              cover
              v-for="photo in estate.photos"
              :key="photo.id"
              :src="
                'http://localhost:3000/estate/' +
                estate.id +
                '/photo/' +
                photo.name
              "
            >
            </v-carousel-item>
          </v-carousel>
        </v-row>
        <v-row align="center" justify="center" class="w-100">
          <v-col cols="auto">
            <v-btn
              class="btn"
              variant="tonal"
              size="x-small"
              @click="goTo(`/estate/${estate.id}`)"
              >Détails du bien</v-btn
            >
          </v-col>
          <v-col cols="auto">
            <v-btn
              class="btn btn-right"
              variant="tonal"
              size="x-small"
              @click="deleteEstate(estate.id)"
              >Suprimer le bien</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </div>
    <div
      class="div-create-customer d-flex w-100 h-100 flex-wrap justify-end"
      max-width="300"
      v-else
    >
      <v-card
        class="w-100 ma-5 pa-5 rounded-shaped d-flex flex-column w-100 h-100 flex-wrap justify-center align-content-center"
        max-width="80%"
      >
        <v-card-title>Aucune données disponibles</v-card-title>
      </v-card>
    </div>
  </div>
</template>
<script src="./estateView.view.js"></script>
<style scoped src="./estateView.css"></style>
