<template>
  <div class="main-div">
    <div class="d-flex h-100 flex-wrap justify-center" v-if="data">
      <v-card
        class="card-estate ma-5 pa-5 rounded d-flex flex-column h-100 flex-wrap justify-center"
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
    if (!this?.$cookies?.get('token')) {
      this.$router.push('/signin');
    }
    {
      try {
        const response = await fetch(`${this.baseUrl}/estate`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        });
        const result = await response.json();
        this.estates = result;
        this.data = true;
      } catch (err) {
        console.log(err);
      }
    }
  },
  methods: {
    async deleteEstate(estateId) {
      try {
        await fetch(`${this.baseUrl}/estate/${estateId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    goTo(path) {
      this.$router.push(path);
    },
    closeModal() {
      this.modal = false;
    },
    openModal() {
      this.modal = true;
    },
  },
};
</script>

<style scoped>
.main-div {
  margin-top: 50px;
}
.card-estate {
  width: 400px;
  /* background: rgba(228, 147, 147, 0.278); */
  background-color: rgb(255, 241, 220);
  border-left: 5px solid rgb(58, 152, 185);
}

.btn {
  color: rebeccapurple;
}
.btn-right {
  color: rgb(172, 38, 38);
}
</style>
