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
      Bien créé avec succès
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
          label="Nom du bien :"
          ref="nomForm"
        ></v-text-field>
        <v-text-field
          v-model="estateToCreate.price"
          label="Prix du bien :"
        ></v-text-field>

        <v-select
          v-model="estateToCreate.type"
          :items="typeEstates"
          item-title="label"
          item-value="value"
          label="Type de bien :"
        ></v-select>
        <v-select
          v-model="estateToCreate.statut"
          :items="status"
          item-title="label"
          item-value="value"
          label="Statut"
        >
        </v-select>
        <v-file-input label="Ajouter des photos" ref="photos" multiple>
        </v-file-input>
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
          label="Numéro de rue :"
        ></v-text-field>
        <v-text-field
          v-model="locationToCreate.street"
          label="Nom de rue :"
        ></v-text-field>
        <v-text-field
          v-model="locationToCreate.city"
          label="Ville :"
        ></v-text-field>
        <v-text-field
          v-model="locationToCreate.country"
          label="Pays :"
        ></v-text-field>
        <v-text-field
          v-model="locationToCreate.code"
          label="Code :"
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
          label="Nom du propriétaire"
        >
        </v-select>
        <v-select
          v-model="estateToCreate.customer_id"
          :items="customers"
          ref="firstname"
          item-title="firstname"
          item-value="id"
          label="prénom"
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
          label="Manager"
        >
        </v-select>
      </v-card>
    </div>
    <v-row align="center" justify="center">
      <v-col cols="auto" class="mb-2">
        <v-btn @click="createEstate">Valider</v-btn>
      </v-col>
      <v-col cols="auto" class="mb-2">
        <v-btn @click="closeModal">Annuler</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ModalCreateEstate',
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      selectedOption: null,
      typeEstates: [
        { value: null, label: null },
        { value: 'apartment', label: 'Apartement' },
        { value: 'maison', label: 'Maison' },
        { value: 'parking', label: 'Parking' },
      ],
      status: [
        { value: null, label: null },
        { value: 'vendu', label: 'Vendu' },
        { value: 'sous_compromis', label: 'Sous compromis' },
        { value: 'a_vendre', label: 'A vendre' },
      ],
      alert: false,
      accept: true,
      locations: [],
      managers: [],
      customerToSearch: '',
      firstFilterToSearchCustomer: '',
      customers: [],
      estateToCreate: {
        name: '',
        price: '',
        statut: '',
        type: '',
        manager_id: '',
        location_id: '',
        customer_id: '',
      },
      locationToCreate: {
        num: '',
        street: '',
        city: '',
        country: '',
        code: '',
      },
    };
  },
  watch: {
    customerToSearch: function (value) {
      this.searchCustomer(value);
    },
    firstFilterToSearchCustomer: function (value) {
      // remise à zéro de l'id prénom qui s'affichait à la regénération du filtre.
      this.estateToCreate.customer_id = '';
      this.searchCustomer(value);
    },
  },
  created: async function getAllLocation() {
    try {
      const managers = await fetch(`${this.baseUrl}/manager`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8080',
        },
      });
      this.managers = await managers.json();
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async searchCustomer(value) {
      // Déclenchement de la recherche uniquement à partir de 3 caractères
      if (value.length > 2) {
        try {
          const customer = await fetch(
            `${this.baseUrl}/customer/search/${value}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8080',
              },
            },
          );
          const result = await customer.json();
          result.length > 0 && (this.customers = result);
        } catch (err) {
          console.log(err);
        }
      }
    },
    closeModal() {
      this.$router.push('/estate');
    },
    /**
     * Création d'un bien ainsi d'une nouvelle localisation
     */
    async createEstate() {
      await this.createLocation();
      // if (!this.createLocation()) {
      //   throw new Error('Formulaire incomplet');
      // }

      const form = new FormData();
      const urlEstate = 'http://localhost:3000/estate';
      for (let i = 0; i < this.$refs.photos.files.length; i++) {
        form.append('photo', this.$refs.photos.files[i]);
      }

      form.append('estate', JSON.stringify(this.estateToCreate));
      try {
        const response = await fetch(urlEstate, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
          body: form,
        });
        console.log(response.status);
        response.status === 200 && (this.accept = true);
      } catch (err) {
        console.log(err);
      }
    },
    async createLocation() {
      console.log('ici');
      const urlLocation = 'http://localhost:3000/location';
      try {
        const location = await fetch(urlLocation, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
          body: JSON.stringify(this.locationToCreate),
        });
        const result = await location.json();
        console.log('localisationLog', result[0]);
        // gestion d'erreur : si la localisation est bien créé, je passe son id, sinon null
        result[0]?.id
          ? (this.estateToCreate.location_id = result[0]?.id)
          : (this.estateToCreate.location_id = null);
      } catch (err) {
        console.log(err);
      }
      // Vérification formulaire complet
      for (const elem in this.estateToCreate) {
        if (this.estateToCreate[elem] === '') {
          this.alert = true;
          return false;
        }
        if (this.locationToCreate[elem] === '') {
          this.alert = true;
          return false;
        }
      }
    },
    checkForm() {
      // for (const elem in this.estateToCreate) {
      //   if (this.estateToCreate[elem] === '') {
      //     console.log(this.estateToCreate);
      //     this.alert = true;
      //     return false;
      //   }
      //   if (this.locationToCreate[elem] === '') {
      //     console.log('manager', this.estateToCreate.manager_id);
      //     this.alert = true;
      //     return false;
      //   }
      // }
    },
  },
};
</script>
<style scoped>
.card {
  background-color: rgb(255, 241, 220);
  border-left: 5px solid rgb(58, 152, 185);
}
</style>
