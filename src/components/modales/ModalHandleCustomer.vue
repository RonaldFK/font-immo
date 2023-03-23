<template>
  <div class="overlay">
    <div class="modal-estate">
      <h3>Numéro client : {{ clientNumber }}</h3>
      <h3>Identité :</h3>
      <input type="text" :value="customerFirstname" ref="firstname" />
      <input type="text" :value="customerLastname" ref="lastname" />
      <h3>Téléphone :</h3>
      <input type="text" :value="tel" ref="tel" />
      <h3>Type de paiement :</h3>
      <input type="text" :value="paymentType" ref="paymentType" />
      <h3>Type de client :</h3>
      <input type="text" :value="clientType" ref="clientType" />
      <input
        type="button"
        @click="modifyCustomer"
        value="Valider"
        form="form"
      />
      <input type="button" value="Annuler" @click="closeModal" form="form" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalHandleCustomer',
  data() {
    return { baseUrl: 'http://localhost:3000' };
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
      this.$emit('emitCloseModal');
    },
    async modifyCustomer() {
      const buildCustomer = {
        firstname: this.$refs.firstname?.value,
        lastname: this.$refs.lastname?.value,
        tel: this.$refs.tel?.value,
        cash_or_credit: this.$refs.paymentType?.value,
        type_of_customer: this.$refs.clientType?.value,
      };
      try {
        await fetch(`${this.baseUrl}/customer/${parseInt(this.clientNumber)}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
          body: JSON.stringify(buildCustomer),
        });
        this.$emit('emitCloseModal');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped>
.modal-estate {
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
