<!-- eslint-disable indent -->
<!-- eslint-disable indent -->
<template>
  <!-- <div class="div-create-btnn">
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn @click="openModalCreateCustomer" prepend-icon="mdi-plus"
          >Créer un nouveau client</v-btn
        >
      </v-col>
    </v-row>
  </div>
  <div class="modal" v-if="modal">
    <ModalHandleCustomer
      @emitCloseModal="closeModal"
      @closeModalNothingChange="closeModalNothingChange"
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
  <div v-if="modalCreateCustomer">
    <ModalCreateCustomer
      @CloseModalCreateCustomer="closeModalCreateCustomer"
      @closeModalNothingChange="closeModalNothingChange"
    ></ModalCreateCustomer>
    <input type="button" value="X" />
  </div> -->
  <div
    class="div-create-customer d-flex w-100 h-100 flex-wrap justify-end"
    max-width="300"
  >
    <v-card
      class="w-100 ma-5 pa-5 rounded-shaped"
      max-width="344"
      v-for="customer in customers"
      :key="customer.id"
    >
      <v-row align="center" justify="center" class="mb-2">
        <v-col cols="auto">
          <v-card-subtitle class="text-subtitle-1 text-blue-grey-darken-1">
            Identifiant Client : {{ customer.id }}</v-card-subtitle
          >
        </v-col>
      </v-row>
      <v-card-subtitle class="text-subtitle-2 text-teal-darken-1" color="red">
        Identité :</v-card-subtitle
      >

      <v-card-text ref="firstname">{{ customer.firstname }}</v-card-text>
      <v-card-text ref="lastname">{{ customer.lastname }}</v-card-text>
      <v-card-subtitle class="text-subtitle-2 text-teal-darken-1">
        Téléphone :</v-card-subtitle
      >
      <v-card-text>{{ customer.tel }}</v-card-text>
      <v-card-subtitle class="text-subtitle-2 text-teal-darken-1">
        Type de paiement :</v-card-subtitle
      >
      <v-card-text>{{
        convertLabelPayment(customer.cash_or_credit)
      }}</v-card-text>
      <v-card-subtitle class="text-subtitle-2 text-teal-darken-1">
        Type de client :</v-card-subtitle
      >
      <v-card-text>{{
        convertLabelCustomer(customer.type_of_customer)
      }}</v-card-text>

      <v-row align="center" justify="center" class="w-100">
        <v-col cols="auto">
          <v-btn
            class="btn"
            @click="openModal(customer)"
            variant="tonal"
            size="x-small"
            >Modifier ce client</v-btn
          >
        </v-col>

        <v-col cols="auto">
          <v-btn
            class="btn btn-left"
            @click="deleteCustomer(customer)"
            variant="tonal"
            size="x-small"
            >Suprimer ce client</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

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
        clientNumber: '',
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
        this.customers = result;
      } catch (err) {
        console.log(err);
      }
    }
  },

  methods: {
    convertLabelPayment(data) {
      switch (data) {
        case 'cash':
          return 'Paiement comptant';

          break;
        case 'credit':
          return 'Paiement crédit';
        default:
          return 'inconnu';
      }
    },
    convertLabelCustomer(data) {
      switch (data) {
        case 'seller':
          return 'Vendeur';
          break;
        case 'renter':
          return 'Locataire';
          break;
        case 'buyer':
          return 'Acheteur';
          break;
        case 'lessor':
          return 'Bailleur';
          break;
        default:
          return 'inconnu';
      }
    },
    openModal(customer) {
      this.currentCustomer = {
        identidyFirstname: customer.firstname,
        identidyLastname: customer.lastname,
        tel: parseInt(customer.tel),
        paymentType: customer.cash_or_credit,
        clientType: customer.type_of_customer,
        clientNumber: parseInt(customer.id),
      };

      this.modal = true;
    },
    openModalCreateCustomer() {
      console.log(this.modalCreateCustomer);
      this.modalCreateCustomer = true;
      console.log(this.modalCreateCustomer);
    },
    closeModal() {
      this.modal = false;
      this.$router.go();
    },
    closeModalNothingChange() {
      this.modalCreateCustomer = false;
      this.modal = false;
    },
    closeModalCreateCustomer() {
      this.modalCreateCustomer = false;
      this.$router.go();
    },
    async deleteCustomer(customer) {
      console.log(this.clientNumber);
      try {
        const response = await fetch(
          `${this.baseUrl}/customer/${customer.id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:8080',
            },
          },
        );
        const result = await response.json();
        console.log(result);
        // this.$emit('emitCloseModal');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped>
.btn {
  color: rebeccapurple;
  /* position: absolute; */
  /* right: 20px;
  bottom: 10px; */
}
.btn-left {
  color: rgb(172, 38, 38);
  /* position: absolute; */
  /* left: 20px;
  bottom: 10px; */
}
.div-create-btn {
  /* position: absolute; */
  /* top: 8rem; */
  width: 100%;
}
.div-create-customer {
  /* position: absolute; */
  /* top: 15rem; */
}
</style>
