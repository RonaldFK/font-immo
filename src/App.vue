<template>
      <NavBar/>
      <SideBar/>
      <router-view></router-view>
  <!-- <FooterView/> -->
  <router-view class="view two" name="wiew_two"></router-view>
  <!-- <router-view class="view two" name="wiew_three"></router-view> -->
</template>

<script>
import NavBar from './views/navigate/NavBar.vue'
import SideBar from './views/navigate/SideBar.vue'
export default {
  name: 'App',
  components: {
    NavBar,
    SideBar
    
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

