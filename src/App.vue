<template>
      <nav class="navbar">
        <div>
          <router-link to="/">Home</router-link> |
          <router-link to="/login">Login</router-link> |
          <router-link to="/estate">Les Biens</router-link> |
          <router-link to="/test">Les Managers</router-link> |
          <router-link to="/test">Les Cliens</router-link> |

          <!-- <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button> -->

        </div>
      </nav>
  <router-view />
</template>

<script>
// import FormAuth from './components/FormAuth.vue';

export default {
  name: 'App',
  components: {
    // FormAuth,
    
  }
}

// 



</script>

