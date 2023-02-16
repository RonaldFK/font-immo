<template>
  <router-view></router-view>
  <div v-for=" info in oneEstate" :key="info.id">

    <h1>{{info.name}}</h1>
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
            console.log('result',this.oneEstate);
            
        } catch(err){
            console.log(err,'TEST ICI');
        }
  },
  
  methods:{
    

  }

  }
</script>


  
   