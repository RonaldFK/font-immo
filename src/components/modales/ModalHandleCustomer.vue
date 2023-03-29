<template>
  <div class="overlay">
    <div class="modal-customer">
      <v-card max-width="500" class="w-100">
        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-card-title>Modification client</v-card-title>
          </v-col>
          <v-col cols="auto">
            <v-card-title>Client numéro : {{ clientNumber }}</v-card-title>
          </v-col>
        </v-row>
        <v-text-field
          label="Prénom :"
          v-model="buildCustomer.firstname"
          ref="firstname"
        ></v-text-field>
        <v-text-field
          v-model="buildCustomer.lastname"
          ref="lastname"
          label="Nom :"
        ></v-text-field>
        <v-text-field
          v-model="buildCustomer.tel"
          ref="tel"
          label="Téléphone :"
        ></v-text-field>
        <v-card-subtitle class="text-subtitle-1">
          Type de paiement :</v-card-subtitle
        >
        <v-select
          :items="typeOfPayments"
          item-title="label"
          item-value="value"
          v-model="buildCustomer.cash_or_credit"
        >
        </v-select>
        <v-card-subtitle class="text-subtitle-1">
          Type de client :</v-card-subtitle
        >
        <v-select
          :items="typeOfClients"
          item-title="label"
          item-value="value"
          v-model="buildCustomer.type_of_customer"
          ref="clientType"
        >
        </v-select>
        <v-row align="center" justify="center">
          <v-col cols="auto" class="mb-2">
            <v-btn @click="modifyCustomer" size="x-small">Valider</v-btn>
          </v-col>
          <v-col cols="auto" class="mb-2">
            <v-btn @click="closeModal" size="x-small">Annuler</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalHandleCustomer',
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      typeOfClients: [
        { id: 0, value: null, label: null },
        { id: 1, value: 'seller', label: 'Vendeur' },
        { id: 2, value: 'renter', label: 'Locataire' },
        { id: 3, value: 'buyer', label: 'Acheteur' },
        { id: 4, value: 'lessor', label: 'Bailleur' },
      ],
      typeOfPayments: [
        { id: 0, value: null, label: null },
        { id: 1, value: 'cash', label: 'Paiement comptant' },
        { id: 2, value: 'credit', label: 'Paiement crédit' },
      ],
      test: 'bobi',
      buildCustomer: {
        firstname: this.customerFirstname || null,
        lastname: this.customerLastname || null,
        tel: this.tel || null,
        cash_or_credit: this.paymentType || null,
        type_of_customer: this.clientType || null,
      },
      rules: [
        (value) => !!value || 'Required.',
        (value) => (value && value.length >= 3) || 'Min 3 characters',
      ],
    };
  },
  props: {
    clientNumber: Number,
    customerFirstname: String,
    customerLastname: String,
    tel: Number,
    paymentType: String,
    clientType: String,
  },
  methods: {
    closeModal() {
      console.log('result', this.customerFirstname);
      this.$emit('closeModalNothingChange');
    },
    // mise à jour avec la valeur input
    // updateUser() {
    //   this.buildCustomer = {
    //     firstname: this.$refs.firstname?.value || null,
    //     lastname: this.$refs.lastname?.value || null,
    //     tel: this.$refs.tel?.value || null,
    //     cash_or_credit: this.$refs.paymentType?.value || null,
    //     type_of_customer: this.$refs.clientType?.value || null,
    //   };
    // },
    async modifyCustomer() {
      console.log('result :', this.buildCustomer);

      try {
        const response = await fetch(
          `${this.baseUrl}/customer/${parseInt(this.clientNumber)}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:8080',
            },
            body: JSON.stringify(this.buildCustomer),
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
.w-100 {
  padding-right: 10px;
  padding-left: 10px;
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
