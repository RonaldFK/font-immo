<template>
      <NavBar/>
  <router-view></router-view>
  <!-- <FooterView/> -->
  <router-view class="view two" name="wiew_two"></router-view>
  <router-view class="view two" name="wiew_three"></router-view>
</template>

<script>
import NavBar from './views/navigate/NavBar.vue'
// import FooterView from './views/Footer.vue'
export default {
  name: 'App',
  components: {
    NavBar,
    // FooterView
    
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

