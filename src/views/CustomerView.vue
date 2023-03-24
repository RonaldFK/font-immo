<template>
  <div class="div-create-btn">
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn @click="openModalCreateCustomer">Créer un nouveau client</v-btn>
      </v-col>
    </v-row>
  </div>
  <div
    class="div-create-customer d-flex mr-5 ml-15 flex-wrap justify-center"
    max-width="500"
    max-height="300"
  >
    <v-card
      class="w-50 ma-5 pa-5 h-100"
      max-width="344"
      v-for="customer in customers"
      :key="customer.id"
    >
      <v-card-subtitle class="text-subtitle-1 text-indigo-darken-2" color="red">
        Identité :</v-card-subtitle
      >
      <v-card-text>{{ customer.firstname }}</v-card-text>
      <v-card-text>{{ customer.lastname }}</v-card-text>
      <v-card-subtitle class="text-subtitle-1"> Téléphone :</v-card-subtitle>
      <v-card-text>{{ customer.tel }}</v-card-text>
      <v-card-subtitle class="text-subtitle-1">
        Type de paiement :</v-card-subtitle
      >
      <v-card-text>{{ customer.cash_or_credit }}</v-card-text>
      <v-card-subtitle class="text-subtitle-1">
        Type de client :</v-card-subtitle
      >
      <v-card-text>{{ customer.type_of_customer }}</v-card-text>
      <v-card-subtitle class="text-subtitle-1">
        Identifiant Client :</v-card-subtitle
      >
      <v-card-text>{{ customer.id }}</v-card-text>
    </v-card>
  </div>
</template>
<!-- <template>
  <div class="modal" v-if="modal">
    <ModalHandleCustomer
      @emitCloseModal="closeModal"
      v-bind="{
        customerFirstname: currentCustomer.identidyFirstname,
        customerLastname: currentCustomer.identidyLastname,
        // customerIdentity2: currentCustomer.lastname,
        tel: currentCustomer.tel,
        paymentType: currentCustomer.paymentType,
        clientType: currentCustomer.clientType,
        clientNumber: currentCustomer.clientNumber,
      }"
    ></ModalHandleCustomer>
  </div>
  <ModalCreateCustomerVue></ModalCreateCustomerVue>
  <div class="div-create-customer">
    <input
      type="button"
      value="Ajouter un client"
      @click="openModalCreateCustomer"
      form="form"
    />
  </div>
  <div class="content-view">
    <div v-if="modalCreateCustomer">
      <ModalCreateCustomer
        @CloseModalCreateCustomer="closeModalCreateCustomer"
      ></ModalCreateCustomer>
      <input type="button" value="X" />
    </div>
    <div
      v-for="customer in customers"
      :key="customer.id"
      class="content-view__list"
    > -->
<!-- <h3>Identité :</h3>
      <p>{{ customer.firstname }}</p>
      <p>{{ customer.lastname }}</p>
      <h3>Téléphone :</h3>
      <p>{{ customer.tel }}</p>
      <h3>Type de paiement :</h3>
      <p>{{ customer.cash_or_credit }}</p>
      <h3>Type de client :</h3>
      <p>{{ customer.type_of_customer }}</p>
      <h3>Identifiant Client :</h3>
      <p>{{ customer.id }}</p>
      <input type="button" @click="openModal" value="Modifier client" />
    </div>
  </div>
</template> -->

<script>
import ModalHandleCustomer from '@/components/modales/ModalHandleCustomer.vue';
import ModalCreateCustomer from '@/components/modales/ModalCreateCustomer.vue';

export default {
  name: 'CustomerView',
  components: { ModalHandleCustomer, ModalCreateCustomer },
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      customers: [],
      modal: false,
      modalCreateCustomer: false,
      reveal: false,
      currentCustomer: {
        identidyFirstname: String,
        identidyLastname: String,
        tel: parseInt(''),
        paymentType: String,
        clientType: String,
        clientNumber: Number,
      },
    };
  },
  created: async function getAllCustomer() {
    {
      try {
        const response = await fetch(`${this.baseUrl}/customer`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
        });
        const result = await response.json();
        // const filter = result.filter(elem=>(elem))
        this.customers = result;
      } catch (err) {
        console.log(err, 'TEST ICI');
      }
    }
  },

  methods: {
    openModal(e) {
      const target = e.target.parentNode;
      this.currentCustomer = {
        identidyFirstname: target.childNodes[1].textContent,
        identidyLastname: target.childNodes[2].textContent,
        tel: parseInt(target.childNodes[4].textContent),
        paymentType: target.childNodes[6].textContent,
        clientType: target.childNodes[8].textContent,
        clientNumber: parseInt(target.childNodes[10].textContent),
      };
      console.log(target.childNodes);
      this.modal = true;
    },
    openModalCreateCustomer() {
      console.log('test');
      this.modalCreateCustomer = true;
    },
    closeModal() {
      this.modal = false;
      this.$router.go();
    },
    closeModalCreateCustomer() {
      this.modalCreateCustomer = false;
      this.$router.go();
    },
    test() {
      console.log('true');
      this.reveal = true;
    },
  },
};
</script>
<style scoped>
.div-create-btn {
  position: fixed;
  top: 8rem;
  width: 100%;
}
.div-create-customer {
  position: absolute;
  top: 15rem;
  /* width: 100%; */
  /* overflow-y: scroll; */
  /* left: 35%; */
}
/*
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.bold {
  font-size: 20px;
  font-weight: bold;
}
.content-view {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15%;
  margin-left: 15rem;
  margin-right: 10rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.content-view__list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 3px solid rgba(167, 206, 201, 0.739);
  min-width: 34rem;
  margin-left: 8rem;
  height: 30rem;
  border-radius: 10px;
  width: 250px;
  border-left-color: rgb(228, 201, 136);
  position: relative;
  background: rgb(194, 222, 209);
}
.content-view__list h2,
p {
  margin-top: 1px;
  margin-bottom: 1px;
  color: rgb(53, 66, 89);
}
.content-view__list h2 {
  text-align: center;
}
.content-view__list a {
  text-decoration: none;
  color: white;
  position: absolute;
  right: 5px;
  bottom: 5px;
}
.content-view__list a:link,
a:visited,
a:active {
  text-decoration: none;
  color: white;
}
.content-view__list a:hover {
  text-decoration: none;
  color: rgb(53, 66, 89);
  transition: 0.2s;
}
.msg-err {
  margin-left: 49rem;
  text-align: center; */
/* } */
</style>
