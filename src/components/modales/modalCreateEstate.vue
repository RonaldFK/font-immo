<template>
  <div>
    <div class="overlay">
      <div class="modal-estate">
        <h1>Création d'un nouveau bien</h1>
        <div>
          <form class="form" action="" method="POST" id="form">
            <h2>Le bien</h2>
            <div>
              <label for="">Nom du bien</label>
              <input v-model="estateToCreate.name" type="text" />
              <label for="">Prix du bien</label>
              <input v-model="estateToCreate.price" type="text" />
              <!-- <label for="">Type</label>
                          <input v-model="estateToCreate.type" type="text"> -->
              <label for="">Type de bien</label>
              <select v-model="estateToCreate.type" name="" id="">
                <option value=""></option>
                <option
                  v-for="typeEstate in typeEstates"
                  :key="typeEstate.value"
                  :value="typeEstate.value"
                >
                  {{ typeEstate.label }}
                </option>
              </select>
              <label for="photos">Photos:</label>
              <input type="file" id="photos" ref="photos" multiple />
              <!-- <select name="" id="">
                  <option v-for="estate in typeEstate" :key="estate.value">
                    {{ estate.label }}
                  </option>
                </select>
                <select name="" id="">
                  <option v-for="location in locations" :key="location.id">
                    {{ location.street }}
                  </option>
                </select> -->
            </div>
            <h2>Le manager</h2>
            <div>
              <select v-model="estateToCreate.manager_id" name="" id="">
                <option value=""></option>
                <option
                  v-for="manager in managers"
                  :key="manager.id"
                  :value="manager.id"
                >
                  {{ manager.firstname }} {{ manager.lastname }}
                </option>
              </select>
            </div>
            <h2>La localisation</h2>
            <div>
              <label for="">Numéro</label>
              <input v-model="locationToCreate.num" type="text" />
              <label for="">Rue</label>
              <input v-model="locationToCreate.street" type="text" />
              <label for="">Ville</label>
              <input v-model="locationToCreate.city" type="text" />
              <label for="">Pays</label>
              <input v-model="locationToCreate.country" type="text" />
              <label for="">Code postale</label>
              <input v-model="locationToCreate.code" type="text" />
            </div>
            <h2>LE stationnement</h2>
            <div>
              <select name="" id="">
                <option value=""></option>
                <option value="parking">Parking</option>
              </select>
            </div>
            <div class="button">
              <input
                type="button"
                value="Valider"
                @click="createEstate"
                form="form"
              />
              <input
                type="button"
                value="Annuler"
                @click="closeModal"
                form="form"
              />
            </div>
            <!-- <button @click="createEstate" form="estate_form">Valider</button>
            <button @click="closeModal" form="estate_form">Annuler</button> -->
          </form>
        </div>
      </div>
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
        { value: 'apartment', label: 'Apartement' },
        { value: 'maison', label: 'Maison' },
        { value: 'parking', label: 'Parking' },
      ],
      locations: [],
      managers: [],
      estateToCreate: {
        name: '',
        price: '',
        statut: '',
        type: '',
        manager_id: '',
        location_id: '',
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
  created: async function getAllLocation() {
    try {
      const response = await fetch(`${this.baseUrl}/location`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8080',
        },
      });
      const managers = await fetch(`${this.baseUrl}/manager`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8080',
        },
      });
      const result = await response.json();
      this.locations = result;
      this.managers = await managers.json();
      console.log(this.managers, 'managers');
    } catch (err) {
      console.log(err, 'TEST ICI');
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeEmit');
    },
    async createEstate() {
      this.$emit('closeEmit');
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
        // console.log(result[0].id, 'ID');
        result[0].id
          ? (this.estateToCreate.location_id = result[0].id)
          : (this.estateToCreate.location_id = null);
        // console.log(location.json(), 'result');
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
        // const result = await response.json();
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
  /* flex-direction: column; */
  /* background: red; */
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
  /* border: 2px solid rgb(10, 9, 9); */
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
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 8%;
  display: flex;
  overflow-y: scroll;
  overflow-x: hidden;
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
  /* background: rebeccapurple; */
}
.overlay {
  /* background: rgba(0, 0, 0, 0.5); */
  background: rgba(44, 41, 41, 0.433);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2;
}
</style>
