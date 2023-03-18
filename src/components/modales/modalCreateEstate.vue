<template>
    <div>

        <div class="overlay">
        <div class="modal-estate">
            <div>

                <h1>Création d'un nouveau bien</h1>
                <div class="form">
                    
                    <form action="" method="POST">
                        <label for="">Nom du bien</label>
                        <input v-model="estateToCreate.nom" type="text">
                        <label for="">Prix du bien</label>
                        <input v-model="estateToCreate.price" type="text">
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
        typeEstate: [
            { value: 'apartment', label: 'Apartement' },
            { value: 'villa', label: 'Villa' },
            { value: 'parking', label: 'Parking' }
        ],
        locations:[],
        estateToCreate:{
            nom:'',
            price:'',
            street:'',
            city:'',
            num:'',
            code:''
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
            this.$emit('closeEmit')
            const form = new FormData()
            const url  = 'http://localhost:3000/estate'
            form.append('estate',this.estateToCreate)
            console.log(JSON.stringify(this.estateToCreate))
            try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "multipart/form-data"
        //   'Access-Control-Allow-Origin': 'http://localhost:8080'
        },
        body: JSON.stringify(form)
      });
      const result = response.json()
      console.log(result);

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