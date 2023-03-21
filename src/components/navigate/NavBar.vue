<template>
  <nav class="navbar">
    <div>
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/estate" v-if="(this.$route = '/estate')"
        >Les Biens</router-link
      >
      | <router-link to="/test">Les Managers</router-link> |
      <router-link to="/customer">Les Cliens</router-link> |
    </div>
    <div class="div-connect">
      <router-link to="/login">Se connecter</router-link>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'NavBar',
};
</script>
