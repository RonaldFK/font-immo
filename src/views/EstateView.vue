<template>
  <div
    class="d-flex w-100 h-100 flex-wrap justify-end"
    max-width="300"
    v-if="data"
  >
    <div class="modal" v-if="modal">
      <ModalCreateEstate @closeEmit="closeModal"></ModalCreateEstate>
    </div>

    <!-- <v-row align="center" justify="center" class="w-100">
      <v-col cols="auto">
        <v-btn class="btnn" variant="tonal" size="small" @click="openModal"
          >Créer un nouveau bien</v-btn
        >
      </v-col>
    </v-row> -->

    <v-card
      class="w-100 ma-5 pa-5 rounded d-flex flex-column w-100 h-100 flex-wrap justify-center"
      max-width="35%"
      v-for="estate in estates"
      :key="estate.id"
    >
      <v-card-title class="align-self-center">{{ estate.name }}</v-card-title>
      <v-card-subtitle>Prix :</v-card-subtitle>
      <v-card-text> {{ estate.price }}</v-card-text>
      <v-card-subtitle>Type du bien :</v-card-subtitle>
      <v-card-text> {{ estate.type }}</v-card-text>
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

  <!-- <div v-if="data" class="content-view">
    <div v-for="estate in estates" :key="estate.id" class="content-view__list">
      <h2>{{ estate.name }}</h2>
      <p><span class="bold">Prix :</span> {{ estate.price }} euros</p>
      <p><span class="bold">Type du bien:</span> {{ estate.type }}</p>
      <router-link :to="'/estate/' + estate.id">Détails</router-link>
      <img src="../assets/img/house3.jpg" alt="" > -->
  <!-- </div>
  </div> -->
</template>

<script>
import ModalCreateEstate from '@/components/modales/ModalCreateEstate.vue';
export default {
  name: 'EstateView',
  components: { ModalCreateEstate },
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      estates: [],
      data: false,
      modal: false,
    };
  },
  created: async function () {
    {
      console.log('test');
      try {
        const response = await fetch(`${this.baseUrl}/estate`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
        });
        const result = await response.json();
        this.estates = result;
        this.data = true;
        console.log(result);
      } catch (err) {
        console.log(err, 'TEST ICI');
      }
    }
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
    closeModal() {
      this.modal = false;
      console.log('TEST');
    },
    openModal() {
      this.modal = true;
    },
  },
};
</script>

<style scoped>
.btn {
  color: rebeccapurple;
}
</style>
