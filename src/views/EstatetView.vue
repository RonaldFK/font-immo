<template>
    <div v-for="estate in estates" :key="estate.id">
      <h1>{{ estate.name }}</h1>
      <h2>Prix : {{ estate.price }} euros</h2>
      <p>Type du bien: {{ estate.type }}</p>

    </div>
    <p>{{estates}}</p>
</template>

<script>
export default {
  name: 'EstatetView',
  data(){
    return{
      baseUrl:'http://localhost:3000',
      estates:[]
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
            // this.estates.push(response)
            console.log(result);
            
        } catch(err){
            console.log(err);
        }
    }
  },
  methods:{
    async getEstate(){
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
            // this.estates.push(response)
            console.log(result);
            
        } catch(err){
            console.log(err);
        }
    }
  }

  }
</script>
