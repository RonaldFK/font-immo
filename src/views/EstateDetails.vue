<template>
  <router-view></router-view>
  <div class="main-details-div">
    <div class="describe-estate" v-for=" info in oneEstate" :key="info.id">
      <h1>{{info.name}}</h1>
      <div>
          <p>Prix du bien : {{ info.price }}</p>
          <p>Type de bien : {{ info.type }}</p>
          <p>Localisation : {{ info.location.num }} {{ info.location.street }} {{ info.location.city }}</p>
          <p>Code postale : {{ info.location.code }}</p>
      </div>
      
    </div>
    <div class="handle-div-describe">

      <div class="describe-manager" v-for=" info in oneEstate" :key="info.id">
        <p>Prenom : {{ info.manager.firstname }}</p>
        <p>Nom : {{ info.manager.lastname }}</p>
        <p>Mail : {{ info.manager.email }}</p>
      </div>
      <div class="describe-client" v-for=" info in oneEstate" :key="info.id">
        <p>Prenom : {{ info.customer.firstname }}</p>
        <p>Nom : {{ info.customer.lastname }}</p>
        <p>Numéro : {{ info.customer.tel }}</p>
        <p>Type client : {{ info.customer.type }}</p>
        <p>Paiement : {{ info.customer?.cash_or_credit }}</p>
      </div>
    </div>
  </div>
  
  <div class="describe-photo">
      <div>
        <img :src="photo.url" alt="" v-for="photo in photoUrl" :key="photo.name">
      </div>
<div class="div-form">
<form action="" method="POST" enctype="multipart/form-data">

  <label for="">Ajouter des photos</label>
      <input type="file"
       name="photo"
       accept="image/png, image/jpeg">
      <input type="submit" value="Valider" class="btn" @click="addPhoto">
    </form>
<button @click="getPhoto">test</button>
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
      photoUrl:[]
      
    }
  },
  methods:{
    addPhoto(e){
      e.preventDefault()
      console.log('test');
    },
    async getPhoto(){
    console.log('TESTGET');
      try{
            const response = await fetch(`http://localhost:3000/photo`,
            {
                method:'GET',
                headers:{
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin":"http://localhost:8080"
                }
            })
            let  result = await response.json()
            result = result.filter(elem => elem.name != '.DS_Store')
            console.log(result,'TEST');
            this.photoUrl = result
            
            
        } catch(err){
            console.log(err,'TEST ICI');
        }
  },
  async getEstate(){
    const id = this.$route.params.id
      // console.log(id);
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
            // console.log(result);
            
        } catch(err){
            console.log(err,'TEST ICI');
        }
  },
  created(){
    this.getEstate()
    this.getPhoto()
  },
  beforeMount() {
   
},
  }

  }
</script>


<style>
.main-details-div{
  display: flex;
  margin-top:12rem;
  margin-left:20rem;
  margin-right:20rem;
  background: red;
  width: 80rem;
  height: 50rem;
}
.describe-estate{
  background: black;
  width: 50%;
}
.describe-manager{
  background: blue;
  height: 50%;
}
.describe-client{
  background:mediumturquoise;
  height: 50%;
}
.describe-photo{
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  margin-left:20rem;
  margin-right:20rem;
  background: red;
  width: 80rem;
  height: 30rem;
  position: relative;
  margin: auto;
  /*  */
  /* overflow-y:auto; */
    /* overflow-x:hidden; */
}
.describe-photo div{
    display: flex;
    gap: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    overflow-y:auto;

}
.describe-photo img{
  border-radius: 5px;
  margin-top: 50px;
  width: 32rem;
  height: 20rem;
  vertical-align: middle;
}
.handle-div-describe{
  background: palegreen;
  width: 50%;
}
.div-form{
  justify-content: center;

    display: flex;
    width: 80rem;
}
.div-form label{
color: white;
}
.div-form input{

    color: white;
    padding: 5px 20px;
    border-radius: 10px;
    color: rgb(100, 98, 98);
}
.btn{
    color: white;
    border: 3px solid rgb(228, 201, 136);
    padding: 5px 20px;
    border-radius: 10px;
    color: rgb(100, 98, 98);
}
</style>


  
   