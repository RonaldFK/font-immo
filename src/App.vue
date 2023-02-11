<template>
  
    <router-link to="/test">test</router-link> |
    <router-link to="/">Home</router-link>
  
    <!-- <FormAuth/> -->
    <div>

      <router-view></router-view>
    </div>
</template>

<script>
// import FormAuth from './components/FormAuth.vue';

export default {
  name: 'App',
  components: {
    // FormAuth,
    
  }
}





</script>

