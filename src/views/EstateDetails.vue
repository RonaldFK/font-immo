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
        class="card ma-5 pa-5 d-flex flex-wrap flex-column justify-center"
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
        class="card-owner ma-5 pa-5 d-flex flex-wrap flex-column justify-center"
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
        <v-card-text> {{ info.customer?.type }}</v-card-text>
        <v-card-subtitle>Paiment :</v-card-subtitle>
        <v-card-text> {{ info.customer?.cash_or_credit }}</v-card-text>
      </v-card>
    </div>

    <v-card
      class="card-photos ma-5 pa-5 d-flex flex-wrap flex-column justify-center"
      v-for="info in oneEstate"
      :key="info.id"
    >
      <div class="d-flex flex-row overflow-x-auto">
        <v-img
          v-for="photo in info.photos"
          :key="photo.id"
          :width="373"
          aspect-ratio="16/9"
          cover
          :src="'http://localhost:3000/estate/' + id + '/photo/' + photo.name"
        ></v-img>
      </div>
    </v-card>
  </div>
  <!-- <router-view></router-view> -->
  <!-- <div class="main-details-div">
    <div class="describe-estate" v-for="info in oneEstate" :key="info.id">
      <h2>{{ info.name }}</h2>
      <div>
        <p>Prix du bien : {{ info.price }}</p>
        <p>Type de bien : {{ info.type }}</p>
        <p v-if="info.location?.num">
          Localisation : {{ info.location.num }} {{ info.location?.street }}
          {{ info.location?.city }}
        </p>
        <p v-else>Localisation :</p>
        <p>Code postale : {{ info.location?.code }}</p>
      </div>
    </div>
    <div class="handle-div-describe">
      <div class="describe-manager" v-for="info in oneEstate" :key="info.id">
        <h2>Manager en charge</h2>
        <p>Prenom : {{ info.manager?.firstname }}</p>
        <p>Nom : {{ info.manager?.lastname }}</p>
        <p>Mail : {{ info.manager?.email }}</p>
      </div>
      <div class="describe-client" v-for="info in oneEstate" :key="info.id">
        <h2>Propriétaire</h2>
        <p>Prenom : {{ info.customer?.firstname }}</p>
        <p>Nom : {{ info.customer?.lastname }}</p>
        <p>Numéro : {{ info.customer?.tel }}</p>
        <p>Type client : {{ info.customer?.type }}</p>
        <p>Paiement : {{ info.customer?.cash_or_credit }}</p>
      </div>
    </div>
  </div>

  <div class="describe-photo">
    <div v-for="info in oneEstate" :key="info.id">
      <img
        v-for="photo in info.photos"
        :key="photo.id"
        :src="'http://localhost:3000/estate/' + id + '/photo/' + photo.name"
      />
    </div>
    <div class="div-form">
      <form action="" method="POST" enctype="multipart/form-data">
        <label for="">Ajouter des photos</label>
        <input type="file" name="photo" accept="image/png, image/jpeg" />
        <input type="submit" value="Valider" class="btn" @click="addPhoto" />
      </form>
    </div>
  </div> -->
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
  margin-left: 50px;
  /* width: 72rem; */
  margin-left: 17rem;
  /* margin-right: 17rem; */
}
.card {
  /* max-width: 80%; */
  /* width: 45%; */
}
.card-estate {
  height: 500px;
  width: 45%;
}
.card-manager {
  height: 200px;
  width: 45%;
}
.card-photos {
  height: 350px;
  width: 100%;
}
.card-photos div {
  width: 100%;
  height: 550px;
}
.card-owner {
  height: 550px;
  background: red;
}
</style>
