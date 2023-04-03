<template>
  <div>
    <v-card>
      <v-layout>
        <v-navigation-drawer theme="dark" permanent color="rgb(78, 110, 129)">
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
              prepend-icon="mdi-home-group"
              title="Biens gérés"
              @click="goTo('/estate')"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account-key"
              title="Mes biens"
              @click="goTo('/manager/my-estate')"
            ></v-list-item>
            <v-list-item title="- - -"></v-list-item>
            <v-list-item
              v-if="this.$route.path === '/estate'"
              prepend-icon="mdi-gavel"
              title="Créer un bien"
              @click="goTo('/estate/create-estate')"
            ></v-list-item>
            <v-list-item
              v-if="this.$route.path === '/customer'"
              prepend-icon="mdi-gavel"
              title="Créer client"
              @click="goTo('/customer/create-customer')"
            ></v-list-item>
          </v-list>

          <template v-slot:append>
            <div class="pa-2">
              <v-btn block @click="goTo('/signup')"> Créer un compte </v-btn>
            </div>
            <div class="pa-2">
              <v-btn block @click="goTo('/socket')"> test </v-btn>
            </div>
            <div class="pa-2">
              <v-btn block @click="goTo('/signin')"> Connexion </v-btn>
            </div>
          </template>
        </v-navigation-drawer>
        <!-- <v-main style="height: 400px"></v-main> -->
      </v-layout>
    </v-card>
  </div>
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
