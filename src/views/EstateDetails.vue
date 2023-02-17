<template>
  <router-view></router-view>
  <div v-for=" info in oneEstate" :key="info.id" class="main_details_div">
    <h1>{{info.name}}</h1>
    <div>
      <p>Prix du bien : {{ info.price }}</p>
      <p>Type de bien : {{ info.type }}</p>
      <p>Localisation : {{ info.location.num }} {{ info.location.street }} {{ info.location.city }}</p>
      <p>Code postale : {{ info.location.code }}</p>
    </div>
    <div>
      <p>{{ info.manager.firstname }}</p>
      <p>{{ info.manager.lastname }}</p>
      <p>{{ info.manager.email }}</p>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'EstateDetails',
  data(){
    return{
      baseUrl:'http://localhost:3000',
      oneEstate:[],
      data:false,
      
    }
  },
  created: async function(){
    const id = this.$route.params.id
      console.log(id);
      try{
            const response = await fetch(`${this.baseUrl}/estate/${id}`,
            {
                method:'GET',
                headers:{
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"http://localhost:8080"
                }
            })
            const result = await response.json()
            this.oneEstate = result
            this.data = true
            // this.estates.push(response)
            console.log(result);
            
        } catch(err){
            console.log(err,'TEST ICI');
        }
  },
  
  methods:{
    

  }

  }
</script>


<style>
.main_details_div{
  
}
</style>


  
   