<template>
  <div>
    <div class="modal-estate">
      <button @click="closeModal">X</button>
      <h2>Identité : {{ customerIdentity }}</h2>
      <p>Téléphone : {{ tel }}</p>
      <p>Type de paiement : {{ payment_type }}</p>
      <p>Type de client : {{ client_type }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalHandleCustomer',
  data() {
    return {};
  },
  props: {
    customerIdentity: String,
    tel: Number,
    payment_type: String,
    client_type: String,
  },
  methods: {
    closeModal() {
      console.log('emission');
      this.$emit('emitCloseModal');
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
  overflow-y: scroll;
  overflow-x: hidden;
  align-items: center;
  height: 40rem;
  background: rgba(210, 204, 204, 0.433);
}
</style>
