<template>
      <nav class="navbar">
        <div>
          <router-link to="/dashboard">Dashboard</router-link> |
          <router-link to="/estate" >Les Biens</router-link> |
          <router-link to="/test">Les Managers</router-link> |
          <router-link to="/test">Les Cliens</router-link> |
        </div>
        <div class="div-connect">
          <router-link to="/login">Se connecter</router-link>
        </div>
      </nav>
  <router-view></router-view>
</template>

<script>
// import TestView from './views/TestView.vue'

export default {
  name: 'App',
  components: {
    // TestView
    
  },
  data(){
    return{
      
    }
  },
  methods:{
    
  }
}

// 



</script>

