<template>
  <div class="div-create-btn">
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-icon>mdi-home</v-icon>
        <v-btn @click="openModalCreateCustomer" prepend-icon="mdi-check-circle"
          >Créer un nouveau client</v-btn
        >
        <!-- <v-btn density="compact" icon="mdi-vuetify"></v-btn> -->
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
  </div>
  <div
    class="div-create-customer d-flex mr-5 ml-15 flex-wrap justify-center"
    max-width="500"
    max-height="300"
  >
    <v-card
      class="w-50 ma-5 pa-5 h-300 rounded-shaped"
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
      <v-card-text>{{ customer.cash_or_credit }}</v-card-text>
      <v-card-subtitle class="text-subtitle-2 text-teal-darken-1">
        Type de client :</v-card-subtitle
      >
      <v-card-text>{{ customer.type_of_customer }}</v-card-text>

      <v-row align="center" justify="end">
        <v-col cols="auto">
          <v-btn
            class="btn"
            @click="openModal(customer)"
            variant="tonal"
            size="x-small"
            >Modifier ce client</v-btn
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
      console.log('ici');
      this.modalCreateCustomer = false;
      this.modal = false;
    },
    closeModalCreateCustomer() {
      this.modalCreateCustomer = false;
      this.$router.go();
    },
  },
};
</script>
<style scoped>
.btn {
  color: rebeccapurple;
  position: absolute;
  right: 20px;
  bottom: 10px;
}
.div-create-btn {
  position: absolute;
  top: 8rem;
  width: 100%;
}
.div-create-customer {
  position: absolute;
  top: 15rem;
}
</style>
