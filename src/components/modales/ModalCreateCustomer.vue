<template>
  <div class="overlay">
    <div class="modal-customer">
      <h2>Création d'un client</h2>
      <h3>Identité :</h3>
      <span
        >Prénom :

        <input type="text" v-model="buildCustomer.firstname" />
      </span>
      <span>
        Nom :
        <input type="text" ref="lastname" v-model="buildCustomer.lastname" />
      </span>
      <span>
        Téléphone :
        <input type="text" ref="tel" v-model="buildCustomer.tel" />
      </span>
      <span
        >Type de paiement :

        <select v-model="buildCustomer.cash_or_credit" id="">
          <option value=""></option>
          <option
            v-for="typeOfPayment in typeOfPayments"
            :key="typeOfPayment.id"
            :value="typeOfPayment.value"
          >
            {{ typeOfPayment.value }}
          </option>
        </select>
      </span>
      <span
        >Type de Client :

        <select v-model="buildCustomer.type_of_customer" id="">
          <option value=""></option>
          <option
            v-for="typeOfClient in typeOfClients"
            :key="typeOfClient.id"
            :value="typeOfClient.value"
          >
            {{ typeOfClient.label }}
          </option>
        </select>
      </span>
      <input
        type="button"
        @click="createCustomer"
        value="Valider"
        form="form"
      />
      <input type="button" value="Annuler" @click="closeModal" form="form" />
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
        { id: 1, value: 'cash' },
        { id: 2, value: 'credit' },
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
      this.$emit('emitCloseModal');
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
      // try {
      //   await fetch(`${this.baseUrl}/customer/${parseInt(this.clientNumber)}`, {
      //     method: 'PATCH',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Access-Control-Allow-Origin': 'http://localhost:8080',
      //     },
      //     body: JSON.stringify(''),
      //   });
      //   this.$emit('emitCloseModal');
      // } catch (err) {
      //   console.log(err);
      // }
    },
  },
};
</script>
<style scoped>
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
  background: rgba(236, 232, 232, 0.825);
}
.overlay {
  /* background: rgba(44, 41, 41, 0.433); */
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2;
}
</style>
