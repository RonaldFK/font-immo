<template>
  <div class="div-create-estate" @click="openModal">
    <button>Créer un nouveau client</button>
  </div>
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
      <router-link :to="'/customer/' + customer.id">Détails</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CustomerView',
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      customers: [],
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
};
</script>
<style></style>
