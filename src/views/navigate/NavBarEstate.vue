<template>
    <nav class="sidenav">
        <div>
          <router-link to="/estate" >Mes Biens</router-link>
          <router-link to="/dashboard">Rechercher un bien</router-link>
          <router-link to="/test">Voir les prêts de clés</router-link>
          <router-link to="/test">Biens sous compromis</router-link>
        </div>
      </nav>
</template>
<script>
export default {
    name: 'NavBarEstate',
}
</script>

<style>

.sidenav {
  height: 100%;
  /* margin-top: 4rem;  */
  width: 14rem; 
  position: fixed; 
  z-index: 1; 
  top: 0; 
  left: 0;
  background-color: rgb(34, 124, 112);
  border: 2px solid rgb(228, 201, 136);
  border-top-right-radius: 10px; 
  overflow-x: hidden; 
  padding-top: 20px;
}


.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
}


.sidenav a:hover {
  color: #f1f1f1;
}

</style>