<template>
    <section class="section" method="POST">
        <form action="../html/index1.html" class="section__form" id="form-login">
            <div class="section__form-login">
                <label for=""></label>
                <input class="input-form" type="text" placeholder="Login" id="login" name="login">
            </div>
            <div class="section__form-pwd">
                <label for=""></label>
                <input class="input-form" type="password" placeholder="Password" id="password" name="password">
            </div>
            <h2 class="section__form-title">Activ acces</h2>
                <button class="btn" type="submit" form="form-login">
                    LogIn
                </button>
        </form>
        <!-- Form request acces -->
        <form action="" class="section__form" id="form-acces" method="POST">
            <div class="section__form-request">
                <div class="section__form_content">

                    <label for="">Prénom : </label>
                    <input class="input-form" type="text" placeholder="Jhon" id="firstname" name="firstname" required>
                    <label for="">Nom : </label>
                    <input class="input-form" type="text" placeholder="Doe" id="lastname" name="lastname" required>
                </div>
                <div class="section__form_content">
                    

                        <label for="">Login : </label>
                        <input class="input-form" type="text" placeholder="john95" id="firstname" name="login" required>
                    

                        <label for="">Email : </label>
                        <input class="input-form" type="text" placeholder="john.doe@domain.com" id="lastname" name="email" required>
                    


                </div>
                <div class="section__form_content">
                    <div>

                        <label for="">Mot de passe : </label>
                        <input class="input-form" type="password" placeholder="******" id="firstname" name="login" required>
                    </div>
                    
                    <div>

                        <label for="">Admin : </label>
                        <input type="checkbox" name="admin" id="admin">
                    </div>
                    

                </div>
            </div>

            <h2 class="section__form-title">No Activ Acces</h2>
            <button class="btn" type="submit" form="form-acces">Request acces</button>
        </form>
    </section>
</template>

<script>
export default {
  name: 'FormAuth',
  props: {
    msg: String
  }
}
</script>

<style >
.section {
    margin: 25rem;
    display: flex;
    justify-content: space-between;
    gap:5rem;
}
.section__form{

    background-color: rgb(228, 201, 136);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items:center;
    gap: 10px;
    width: 45rem;
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
    /* flex-direction: column; */
    width: 100%;
    /* height: 100vh; */
    margin: 5px;
    flex-wrap: wrap;
    align-content: space-around;
    gap: 2rem;

}
.section__form_content div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
 
}
.section__form_content label {
    margin-right: 2px;
 
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