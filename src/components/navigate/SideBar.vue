<template>
  <div>
    <v-card>
      <v-layout>
        <v-navigation-drawer class="bg-cyan-darken-2" theme="dark" permanent>
          <v-list color="transparent">
            <v-list-item
              prepend-icon="mdi-view-dashboard"
              title="Dashboard"
              @click="goTo('/dashboard')"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account-box"
              title="Clients"
              @click="goTo('/customer')"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-gavel"
              title="Biens gérés"
              @click="goTo('/estate')"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-gavel"
              title="Mes biens"
              @click="goTo('/manager/my-estate')"
            ></v-list-item>
            <v-list-item title="- - -"></v-list-item>
            <v-list-item
              v-if="this.$route.path === '/estate'"
              prepend-icon="mdi-gavel"
              title="Créer un bien"
              @click="goTo('/manager/create-estate')"
            ></v-list-item>
            <v-list-item
              v-if="this.$route.path === '/customer'"
              prepend-icon="mdi-gavel"
              title="Créer client"
              @click="goTo('/manager/create-customer')"
            ></v-list-item>
          </v-list>

          <template v-slot:append>
            <div class="pa-2">
              <v-btn block> Logout </v-btn>
            </div>
          </template>
        </v-navigation-drawer>
        <!-- <v-main style="height: 400px"></v-main> -->
      </v-layout>
    </v-card>
  </div>

  <!-- <nav class="sidenav">
    <div>
      <router-link to="/estate">Mes Biens</router-link>
      <router-link to="/dashboard">Rechercher un bien</router-link>
      <router-link to="/test">Voir les prêts de clés</router-link>
      <router-link to="/test">Biens sous compromis</router-link>
    </div>
  </nav> -->
</template>
<script>
export default {
  name: 'NavBarEstate',
  data() {
    return {};
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
    created() {
      console.log(this.$router.path);
    },
  },
};
</script>

<style></style>
