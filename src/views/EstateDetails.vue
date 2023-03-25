<template>
  <div class="main-div d-flex w-100 h-100 flex-wrap flex-column justify-center">
    <v-card
      class="card ma-5 pa-5 h-100 d-flex flex-wrap flex-column justify-center"
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
    <v-card
      class="card ma-5 pa-5 h-100 d-flex flex-wrap flex-column justify-center"
      v-for="info in oneEstate"
      :key="info.id"
    >
      <v-card-title class="align-self-center"> Manager en charge </v-card-title>
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
}
.card {
  max-width: 80%;
}
.main-details-div {
  display: flex;
  margin-top: 12rem;
  margin-left: 50%;
  width: 54rem;
  height: 26rem;
  background: rgb(194, 222, 209);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.describe-estate {
  width: 50%;
  border-radius: 17px;
  margin-bottom: 1rem;
  margin-right: 1rem;
  height: 25rem;
  padding-left: 1rem;
}
.describe-estate h2 {
  text-align: center;
}
.describe-manager {
  padding-left: 1rem;
}
.describe-manager h2 {
  text-align: center;
}
.describe-client {
  padding-left: 1rem;
}
.describe-client h2 {
  text-align: center;
}
.describe-photo {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  margin-left: 50%;
  width: 54rem;
  height: 23rem;
  position: relative;
  background: rgb(194, 222, 209);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.describe-photo div {
  display: flex;
  gap: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  overflow-y: auto;
  width: 52rem;
}
.describe-photo img {
  border-radius: 5px;
  margin-top: 50px;
  width: 32rem;
  height: 15rem;
  vertical-align: middle;
}
.handle-div-describe {
  width: 50%;
  border-radius: 17px;
  margin-bottom: 1rem;
  margin-right: 1rem;
  height: 25rem;
}
.div-form {
  justify-content: center;

  display: flex;
  width: 80rem;
}
.div-form label {
  color: white;
}
.div-form input {
  color: white;
  padding: 5px 20px;
  border-radius: 10px;
  color: rgb(100, 98, 98);
}
.btn {
  color: white;
  border: 3px solid rgb(228, 201, 136);
  padding: 5px 20px;
  border-radius: 10px;
  color: rgb(100, 98, 98);
}
</style>
