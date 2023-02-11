<template>
          <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link> |
        <!-- <router-link to="/sign-in">Login</router-link> -->
        <!-- <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button> -->
      </nav>
</template>

<script>
export default {
  name: 'NavBar'

  }
</script>