<template>
  <div class="overlay">
    <div class="d-flex flex-wrap h-100 flex-row justify-center">
      <v-card max-width="500" class="w-100">
        <v-row align="center" justify="center" class="mb-5">
          <v-col cols="auto">
            <v-card-title>Création d'un nouveau bien</v-card-title>
          </v-col>
        </v-row>
        <v-text-field
          v-model="estateToCreate.name"
          label="Nom du bien :"
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
      <v-card max-width="500" class="w-100 mt-5">
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
      <v-card max-width="500" class="w-100 mt-5">
        <v-text-field
          v-model="customerToSearch"
          ref="customerToSearch"
          label="Propriétaire :"
        ></v-text-field>
        <v-select
          :items="customers"
          item-title="lastname"
          item-value="id"
          label="Nom du propriétaire"
        >
        </v-select>
        <v-select
          v-model="estateToCreate.customer_id"
          :items="customers"
          item-title="firstname"
          item-value="id"
          label="prénom"
        >
        </v-select>
      </v-card>
      <v-card max-width="500" class="w-100 mt-5">
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
        <v-row align="center" justify="center">
          <v-col cols="auto" class="mb-2">
            <v-btn @click="createEstate">Valider</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
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
      locations: [],
      managers: [],
      customerToSearch: '',
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
  },
  created: async function getAllLocation() {
    try {
      // const response = await fetch(`${this.baseUrl}/location`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': 'http://localhost:8080',
      //   },
      // });
      const managers = await fetch(`${this.baseUrl}/manager`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8080',
        },
      });
      // const result = await response.json();
      // this.locations = result;
      this.managers = await managers.json();
      console.log(this.managers, 'managers');
    } catch (err) {
      console.log(err, 'TEST ICI');
    }
  },
  methods: {
    test(value) {
      return value;
    },
    async searchCustomer(value) {
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
          console.log(result);
          // result[0].id
          //   ? (this.estateToCreate.location_id = result[0].id)
          //   : (this.estateToCreate.location_id = null);
        } catch (err) {
          console.log(err, 'TEST ICI');
        }
      }
    },
    closeModal() {
      this.$router.push('/estate');
    },
    async createEstate() {
      console.log(this.estateToCreate.customer_id);
      const urlLocation = 'http://localhost:3000/location';
      const form = new FormData();
      const urlEstate = 'http://localhost:3000/estate';
      for (let i = 0; i < this.$refs.photos.files.length; i++) {
        form.append('photo', this.$refs.photos.files[i]);
      }
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
        result[0].id
          ? (this.estateToCreate.location_id = result[0].id)
          : (this.estateToCreate.location_id = null);
      } catch (err) {
        console.log(err, 'TEST ICI');
      }
      form.append('estate', JSON.stringify(this.estateToCreate));
      try {
        await fetch(urlEstate, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
          body: form,
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped>
.modal-estate form {
  display: flex;
  flex-wrap: wrap;
  width: 44rem;
  height: 18rem;
  margin-top: 10px;
  margin-bottom: 85px;
  align-items: center;
}
.modal-estate div form input {
  width: 20rem;
}
.modal-estate div form label {
  width: 20rem;
}
.modal-estate div form select {
  width: 20rem;
}
.modal-estate div {
  width: 54rem;
  display: flex;
  flex-direction: column;
  padding-right: 10rem;
  padding-left: 10rem;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
}
.modal-estate div form > h2 {
  color: red;
  text-align: center;
}
.modal-estate {
  /* display: flex; */
  flex-direction: column;
  position: relative;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 8%;
  /* display: flex; */
  /* overflow-y: scroll; */
  /* overflow-x: hidden; */
  align-items: center;
  height: 40rem;
  background: rgba(210, 204, 204, 0.433);
}
.modal-estate form div {
  display: flex;
  flex-direction: row;
}
.button {
  margin-top: 10px;
  padding-bottom: 10px;
  height: 15px;
}
.overlay {
  background: rgba(44, 41, 41, 0.433);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2;
}
</style>
