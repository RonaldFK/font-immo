<template>
<router-view></router-view>
  <div v-if="data" class="content-view">
    <div v-for="estate in estates" :key="estate.id" class="content-view__list">
      <h1>{{ estate.name }}</h1>
      <h2>Prix : {{ estate.price }} euros</h2>
      <p>Type du bien: {{ estate.type }}</p>
      <router-link :to="'/estate/'+estate.id">Détails</router-link>
      <img src="../assets/img/house3.jpg" alt="" >
    </div>
  </div>
</template>

<script>
export default {
  name: 'EstateView',
  data(){
    return{
      baseUrl:'http://localhost:3000',
      estates:[],
      data:false,
      
    }
  },
  created: async function(){
    {
      console.log('test');
      try{
            const response = await fetch(`${this.baseUrl}/estate`,
            {
                method:'GET',
                headers:{
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"http://localhost:8080"
                }
            })
            const result = await response.json()
            this.estates = result
            this.data = true
            // this.estates.push(response)
            console.log(result,this.data);
            
        } catch(err){
            console.log(err,'TEST ICI');
        }
    }
  },
  methods:{

  }

  }
</script>

<style>
.content-view{
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  margin-top: 10rem;
  margin-left: 15rem;
  margin-right: 10rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.content-view__list{
  border: 3px solid rgb(34, 124, 112);
  min-width: 45%;
  height: 25rem;
  border-radius: 10px;
  width: 250px;
  position: relative;
  background: rgba(167, 206, 201, 0.739);
}
.content-view__list  a{
    text-decoration: none;
    color: white;
    position: absolute;
    right: 5px;
    bottom: 5px;
}
.content-view__list img{
    border-radius: 10%;
    position: absolute;
    width: 15rem;
    height: 12rem;
    right: 5px;
    top: 5px;
}
.content-view__list  a:link, a:visited,a:active{
    text-decoration: none;
    color: white;
}
.content-view__list  a:hover{
    text-decoration: none;
    color: black;
}
</style>
