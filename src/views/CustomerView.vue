<template>
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
  <!-- <ModalCreateCustomerVue></ModalCreateCustomerVue> -->
  <div class="content-view">
    <div
      v-for="customer in customers"
      :key="customer.id"
      class="content-view__list"
    >
      <h3>Identité :</h3>
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
        this.customers = result;
      } catch (err) {
        console.log(err, 'TEST ICI');
      }
    }
  },
  //   updated: async function () {
  //     console.log('updated');
  //   },
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
    closeModal() {
      this.$router.go();
      this.modal = false;
    },
  },
};
</script>
<style scoped>
.div-create-estate {
  position: fixed;
  top: 8rem;
  left: 5%;
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
  text-align: center;
}
</style>
