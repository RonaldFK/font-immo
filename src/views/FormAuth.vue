<template>
    <section class="section" method="POST">
        <form action="../html/index1.html" class="section__form" id="form-login">
            <div class="section__form-login">
                <label for=""></label>
                <input class="input-form" type="text" placeholder="Login" v-model="userToLog.login">
            </div>
            <div class="section__form-pwd">
                <label for=""></label>
                <input class="input-form" type="password" placeholder="Password" v-model="userToLog.password">
            </div>
                <div>
                    <label for="">Admin : </label>
                    <input type="checkbox" name="admin" id="admin"  v-model="userToCreate.type">
                </div>
                <!-- <div>{{ errMsg }}</div> -->
                <span v-if="errMsg">Login ou mot de passe incorrect</span>
            <h2 class="section__form-title">Se connecter</h2>
                <button class="btn" type="submit" form="form-login"  @click="sendRequestLogin">
                    LogIn
                </button>
        </form>
        <!-- Form request acces -->
        <form action="" class="section__form" id="form-acces" method="POST">
            <div class="section__form-request">
                <div class="section__form_content">
                  
                        <label for="">Prénom : </label>
                        <input class="input-form" type="text" placeholder="Jhon" id="firstname" name="firstname" v-model="userToCreate.firstname" required>

                    

                        <label for="">Nom : </label>
                        <input class="input-form" type="text" placeholder="Doe" id="lastname" name="lastname" v-model="userToCreate.lastname" required>
                   

                </div>
                <div class="section__form_content"> 
                    <div>
                        <label for="">Login : </label>
                        <input class="input-form" type="text" placeholder="john95" id="firstname" name="login" v-model="userToCreate.login" required>

                    </div>
                    <div>

                        <label for="">Email : </label>
                        <input class="input-form" type="text" placeholder="john.doe@domain.com" id="lastname" name="email" v-model="userToCreate.email" required>
                    </div>               

                    


                </div>
                <div class="section__form_content">
                    <div>

                    <label for="">Mot de passe : </label>
                    <input class="input-form" type="password" placeholder="******" id="firstname" name="login" v-model="userToCreate.password" required>
                    </div>
                    <div>

                        <label for="">Confirmer : </label>
                        <input class="input-form" type="password" placeholder="******" id="firstname" name="login" v-model="userToCreate.checkPassword" required>
                    </div>
                    <h2 class="section__form-title">Créer un compte</h2>
                    <button class="btn" type="submit" form="form-acces" @click="sendRequestAccess">Request acces</button>
                    
                </div>
            </div>

        </form>
    </section>
</template>

<script>


export default {
  name: 'FormAuth',
  props: {
    msg: String
  },
  data(){
    return{
        baseUrl:'http://localhost:3000',
        userToCreate:{},
        userToLog:{},
        errMsg:false
    }
  },
  methods:{
    async sendRequestAccess(e){
        e.preventDefault()
        console.log(this.userToCreate);
        try{
            const response = await fetch(`${this.baseUrl}/auth/signup`,
            {
                method:'POST',
                headers:{
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"http://localhost:8080"
                },
                body:JSON.stringify(this.userToCreate)
            })
            if(response.ok){console.log(response.status);}
           
            this.userToCreate = {}
        } catch(err){
            console.log(err);
            // Prévoir message d'erreur utilisateur
        }
    },
    async sendRequestLogin(e){
        e.preventDefault()
      console.log('ici');
        try{
            const response = await fetch(`${this.baseUrl}/auth/signin`,
            {
                method:'POST',
                headers:{
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"http://localhost:8080"
                },
                body:JSON.stringify(this.userToLog)
            })
            this.userToLog = {}
            if(response.status === 200){   
                this.$router.push('/estate') 
            } else{
                this.errMsg = true
            }
        } catch(err){
            console.log(err);
        }
    }
  }
}
</script>

<style >
.section {
    margin: 20rem;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    gap:5rem;
}
.section__form{

    background-color: rgb(228, 201, 136);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items:center;
    
    gap: 10px;
    width: 35rem;
    height: 20rem;
    position: relative;
    padding-top: 20px;
    top: 45%;
}
.section__form-request{
    color: blue;
    display: flex;
    width: 100%;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: flex-start;
}
.section__form_content{
    display: flex;
    justify-content: center;
    width: 100%;
    /* height: 100vh; */
    margin: 5px;
    flex-wrap: wrap;
    align-content: flex-end;
    gap: 2rem;

}
.section__form_content div {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    /* gap: 1rem; */
 
}
.section__form_content label {
    /* margin-right: 2px; */
 
}
.section__form_content input {
    
    padding-left: 2px;
   
}
.input-form {
    border-radius: 5px;
    text-align: center;
    padding:0.5rem;
    
}
.selectlist {
    padding: 0.4rem;
    width: 100%;
    font-family:'Asap', sans-serif;
    position: relative;
    padding-right: 5rem;
    padding-left: 5rem;
    
}
.section__form-job label {
    font-size: 15px;
}
.selectlist:after {
    position: absolute;
    content: "";
    top: 14px;
    right: 10px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-color: #fff transparent transparent transparent;
  }
.section__form-title {
    color: white;
    font-weight: 900;
    font-size: 2rem;
    position: absolute;
    bottom: 40px;
}
select {
    margin-top: 10px;
    width: 100%;
    padding: 5px 35px 5px 5px;
    font-size: 18px;   
}
.btn {
    border-radius: 5px;
    text-align: center;
    padding: 0.5rem;
    position: absolute;
    bottom: 10px;
}

</style>