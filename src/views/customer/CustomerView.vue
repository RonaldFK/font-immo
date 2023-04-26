<!-- eslint-disable indent -->
<!-- eslint-disable indent -->
<template>
  <div class="main-div">
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
    <!-- <div v-if="modalCreateCustomer">
      <ModalCreateCustomer
        @CloseModalCreateCustomer="closeModalCreateCustomer"
        @closeModalNothingChange="closeModalNothingChange"
      ></ModalCreateCustomer>
      <input type="button" value="X" />
    </div> -->
    <div
      class="div-create-customer d-flex w-100 h-100 flex-wrap justify-center"
      max-width="300"
    >
      <v-card
        class="card-customer w-100 ma-5 pa-5 rounded-shaped"
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
        <v-card-subtitle class="text-subtitle-2 text-teal-darken-1">
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
  </div>
</template>
<script src="./customer.view.js"></script>
<style scoped src="./customer.css"></style>
