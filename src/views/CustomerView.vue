<template>
  <div class="modal" v-if="modal">
    <ModalHandleCustomer
      @emitCloseModal="closeModal"
      v-bind="{
        currentIdentity: currentCustomer.firstname,
        currentIdentity2: currentCustomer.lastname,
      }"
    ></ModalHandleCustomer>
  </div>
  <!-- <ModalCreateCustomerVue></ModalCreateCustomerVue> -->
  <div class="content-view">
    <div
      v-for="customer in customers"
      :key="customer.id"
      class="content-view__list"
    >
      <h2>Identité : {{ customer.firstname }} {{ customer.lastname }}</h2>
      <p>Téléphone : {{ customer.tel }}</p>
      <p>Type de paiement : {{ customer.cash_or_credit }}</p>
      <p>Type de client : {{ customer.type_of_customer }}</p>
      <input type="button" @click="openModal" value="Modifier client" />
    </div>
  </div>
</template>

<script>
import ModalHandleCustomer from '@/components/modales/ModalHandleCustomer.vue';
export default {
  name: 'CustomerView',
  components: { ModalHandleCustomer },
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      customers: [],
      modal: false,
      currentCustomer: {
        firstname: 'bobi',
        lastname: 'jhon',
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
        console.log(result);
      } catch (err) {
        console.log(err, 'TEST ICI');
      }
    }
  },
  methods: {
    openModal() {
      console.log('bobi');
      this.modal = true;
    },
    closeModal() {
      console.log('test');
      this.modal = false;
    },
  },
};
</script>
<style></style>
