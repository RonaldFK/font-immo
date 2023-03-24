<template>
  <div class="overlay">
    <div class="modal-customer">
      <v-card max-width="500" class="w-50">
        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-card-title>Création d'un client</v-card-title>
          </v-col>
        </v-row>
        <v-card-subtitle class="text-subtitle-1"> Prénom :</v-card-subtitle>
        <v-text-field v-model="buildCustomer.firstname"></v-text-field>
        <v-card-subtitle class="text-subtitle-1"> Nom :</v-card-subtitle>
        <v-text-field v-model="buildCustomer.lastname"></v-text-field>
        <v-card-subtitle class="text-subtitle-1"> Téléphone :</v-card-subtitle>
        <v-text-field v-model="buildCustomer.tel"></v-text-field>
        <v-card-subtitle class="text-subtitle-1">
          Type de paiement :</v-card-subtitle
        >
        <v-select
          v-model="buildCustomer.cash_or_credit"
          :items="typeOfPayments"
          item-title="label"
          item-value="value"
        >
        </v-select>
        <v-card-subtitle class="text-subtitle-1">
          Type de client :</v-card-subtitle
        >
        <v-select
          v-model="buildCustomer.type_of_customer"
          :items="typeOfClients"
          item-title="label"
          item-value="value"
        >
        </v-select>
        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-btn @click="createCustomer">Valider</v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn @click="closeModal">Annuler</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalCreateCustomer',
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      typeOfClients: [
        { id: 1, value: 'seller', label: 'Vendeur' },
        { id: 2, value: 'renter', label: 'Locataire' },
        { id: 3, value: 'buyer', label: 'Acheteur' },
        { id: 4, value: 'lessor', label: 'Bailleur' },
      ],
      typeOfPayments: [
        { id: 1, value: 'cash', label: 'Paiement comptant' },
        { id: 2, value: 'credit', label: 'Paiement crédit' },
      ],
      buildCustomer: {
        firstname: '',
        lastname: '',
        tel: '',
        cash_or_credit: '',
        type_of_customer: '',
      },
    };
  },

  methods: {
    closeModal() {
      this.$emit('closeModalNothingChange');
    },
    async createCustomer() {
      const newCustomer = {
        firstname: this.buildCustomer?.firstname || null,
        lastname: this.buildCustomer.lastname || null,
        tel: this.buildCustomer.tel || null,
        cash_or_credit: this.buildCustomer.cash_or_credit || null,
        type_of_customer: this.buildCustomer.type_of_customer || null,
      };
      console.log(newCustomer);
      try {
        await fetch(`${this.baseUrl}/customer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
          body: JSON.stringify(newCustomer),
        });
        this.$emit('CloseModalCreateCustomer');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped>
.w-50 {
  padding-right: 5rem;
  padding-left: 5rem;
}
.modal-customer {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 8%;
  display: flex;
  /* overflow-y: scroll; */
  overflow-x: hidden;
  align-items: center;
  height: 40rem;
  /* background: rgba(236, 232, 232, 0.825); */
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
