<template>
    <div>

        <div class="overlay">
        <div class="modal-estate">
            <div>

                <h1>Création d'un nouveau bien</h1>
                <div class="form">
                    
                    <form action="" method="POST">
                        <label for="">Nom du bien</label>
                        <input v-model="estateToCreate.name" type="text">
                        <label for="">Prix du bien</label>
                        <input v-model="estateToCreate.price" type="text">
                        <!-- <label for="">Type</label>
                        <input v-model="estateToCreate.type" type="text"> -->
                        <select v-model="estateToCreate.type" name="" id="">
                            <option v-for="typeEstate in typeEstates" :key="typeEstate.value" :value="typeEstate.value" >{{typeEstate.label}}</option>
                        </select>
                        <label for="">Numéro</label>
                        <input v-model="estateToCreate.num" type="text">
                        <label for="">Rue</label>
                        <input v-model="estateToCreate.street" type="text">
                        <label for="">Ville</label>
                        <input v-model="estateToCreate.city" type="text">
                        <label for="">Pays</label>
                        <input v-model="estateToCreate.country" type="text">
                        <label for="">Code postale</label>
                        <input v-model="estateToCreate.code" type="text">
                        <label for="photos">Photos:</label>
                        <input type="file" id="photos" ref="photos" multiple>
                        <!-- <select name="" id="">
                            <option v-for="estate in typeEstate" :key="estate.value" >{{ estate.label }} </option> 
                        </select>
                        <select name="" id="">
                            <option v-for="location in locations" :key="location.id" >{{ location.street }} </option> 
                        </select> -->
                    </form>
                </div>
                <button @click="createEstate">Valider</button>   
            </div>
        </div>
        </div>
    </div>
</template>

<script>

export default {
    name:'ModalCreateEstateVue',
    data() {
       return{
        baseUrl: 'http://localhost:3000',
        selectedOption: null,
        typeEstates: [
            { value: 'apartment', label: 'Apartement' },
            { value: 'maison', label: 'Maison' },
            { value: 'parking', label: 'Parking' }
        ],
        locations:[],
        estateToCreate:{
            name:'',
            price:'',
            statut:'',
            type:'',
            // num:'',
            // code:''
        }
       }
    },
    created: async function getAllLocation(){
        try {
      const response = await fetch(`${this.baseUrl}/location`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8080'
        }
      })
      const result = await response.json()
      this.locations = result
      console.log(this.locations, 'location')
    } catch (err) {
      console.log(err, 'TEST ICI')
    }
    },
    methods:{
        handleModa(){
            this.$emit('openModal')
            console.log(this.estateToCreate);
        },
        async createEstate(){
            const form = new FormData()
            const url  = 'http://localhost:3000/estate'
            form.append('estate',JSON.stringify(this.estateToCreate))
            for (let i = 0; i < this.$refs.photos.files.length; i++) {
                form.append('photo', this.$refs.photos.files[i])
      }
            console.log(this.$refs.photos)
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
            'Accept': 'application/json',
            // 'Content-Type': 'multipart/form-data'
        //   'Access-Control-Allow-Origin': 'http://localhost:8080'
    } ,
    body: form
});
const result = await response.json()
console.log(result);

this.$emit('closeEmit')
    } catch (err) {
      console.log(err, 'TEST ICI')
    }
        }
    }
}
</script>
<style scoped>
.modal-estate {
    display: flex;
    flex-direction: column;
    /* background: red; */
 
}
.modal-estate div{
    display: flex;
    flex-direction: column;
    /* background: red; */
    width: 44rem;
    height: 18rem;
    margin-top: 10px;
    margin-bottom: 85px;
    align-items: center;
}
.modal-estate div form input{
    width: 54rem;
}
.modal-estate div form label{
    width: 54rem;
}
.modal-estate div form{
    width: 30rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
}
.modal-estate{

    margin-left: 20%;
    margin-right: 20%;
    margin-top: 8%;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    height: 41rem;
    background: rgba(210, 204, 204, 0.433);
}
.overlay {
    /* background: rgba(0, 0, 0, 0.5); */
    background: rgba(44, 41, 41, 0.433);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 2;
}
</style>