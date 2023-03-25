<template>
  <div>
    <v-card>
      <v-layout>
        <v-navigation-drawer class="bg-deep-purple" theme="dark" permanent>
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
    return {
      items: [
        { title: 'Accueil', path: '/' },
        { title: 'Produits', path: '/products' },
        { title: 'Contactez-nous', path: '/contact' },
      ],
    };
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style>
.sidenav {
  height: 80%;
  margin-top: 12rem;
  width: 18rem;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(53, 66, 89);
  /* border: 2px solid rgb(228, 201, 136); */
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow-x: hidden;
  padding-top: 20px;
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
}

.sidenav a:hover {
  color: rgb(236, 229, 199);
  font-weight: bold;
  transition: 0.2s;
}
</style>
