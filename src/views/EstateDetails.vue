<template>
  <div class="main-div d-flex flex-wrap h-100 flex-row justify-center">
    <v-card
      class="card card-estate ma-5 pa-5 d-flex flex-wrap flex-column justify-center"
      v-for="info in oneEstate"
      :key="info.id"
    >
      <v-card-title class="align-self-center">
        Description du bien
      </v-card-title>
      <v-card-text> {{ info.name }}</v-card-text>
      <v-card-subtitle>Prix du bien :</v-card-subtitle>
      <v-card-text> {{ info.price }}</v-card-text>
      <v-card-subtitle>Type du bien :</v-card-subtitle>
      <v-card-text> {{ info.type }}</v-card-text>
      <v-card-subtitle>Localisation :</v-card-subtitle>
      <v-card-text v-if="info.location?.num">
        {{ info.location.num }} {{ info.location?.street }}
        {{ info.location?.city }}</v-card-text
      >
      <v-card-subtitle>Code postale :</v-card-subtitle>
      <v-card-text>{{ info.location?.code }}</v-card-text>
      <v-card-subtitle>Type du bien :</v-card-subtitle>
      <v-card-text> {{ info.type }}</v-card-text>
    </v-card>
    <div class="card-manager">
      <v-card
        class="card ma-5 pa-5 d-flex flex-wrap w-100 flex-column justify-center"
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
        class="card card-owner ma-5 pa-5 d-flex w-100 flex-wrap flex-column justify-center"
        v-for="info in oneEstate"
        :key="info.id"
      >
        <v-card-title class="align-self-center"> Propriétaire </v-card-title>
        <v-card-text>
          {{ info.manager?.firstname }}
          {{ info.manager?.lastname }}</v-card-text
        >
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
      class="card-photos ma-5 pa-5 d-flex flex-wrap flex-column justify-center overflow-x-auto"
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
  </div>
</template>

<script>
export default {
  name: 'EstateDetails',
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      oneEstate: [],
      data: false,
      photoUrl: [],
      id: this.$route.params.id,
    };
  },
  created: async function getEstateDetails() {
    // console.log(id);
    try {
      const response = await fetch(`${this.baseUrl}/estate/${this.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8080',
        },
      });
      const result = await response.json();
      this.oneEstate = result;
      this.data = true;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async addPhoto() {
      try {
        const response = await fetch(`http://localhost:3000/photo`, {
          method: 'GET',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
        });
        let result = await response.json();
        result = result.filter((elem) => elem.name != '.DS_Store');
        console.log(result, 'TEST');
        this.photoUrl = result;
      } catch (err) {
        console.log(err, 'TEST ICI');
      }
    },
  },
};
</script>

<style>
.main-div {
  margin-left: 272px;
}
.card-estate {
  height: 707px;
  min-width: 288px;
  width: 45%;
}
.card-manager {
  min-width: 30rem;
  height: 100px;
  width: 45%;
}
.card-owner {
  height: 490px;
  background: red;
}
.card-photos {
  height: 400px;
  width: 100%;
}
</style>
