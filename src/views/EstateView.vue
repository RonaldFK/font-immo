<template>
  <button class="btn-estate" @click="modalCreateEstate" role="button">
    Créer une activité
  </button>
  <div v-if="data" class="content-view">
    <div v-for="estate in estates" :key="estate.id" class="content-view__list">
      <h2>{{ estate.name }}</h2>
      <p><span class="bold">Prix :</span> {{ estate.price }} euros</p>
      <p><span class="bold">Type du bien:</span> {{ estate.type }}</p>
      <router-link :to="'/estate/' + estate.id">Détails</router-link>
    </div>
  </div>
  <div class="content-view msg-err" v-else>
    <div class="content-view__list">
      <h1>Aucune données</h1>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'EstateView',

  data() {
    return {
      baseUrl: 'http://localhost:3000',
      estates: [],
      data: false
    }
  },
  created: async function () {
    {
      console.log('test')
      try {
        const response = await fetch(`${this.baseUrl}/estate`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080'
          }
        })
        const result = await response.json()
        this.estates = result
        this.data = true
        // console.log(result, this.data)
      } catch (err) {}
    }
  },
  methods: {
    modalCreateEstate() {
      console.log('test')
    }
  }
}
</script>

<style>
.btn-estate {
  /* width: 500px; */
  top: 17vh;
  left: 50%;
}
.btn-estate {
  background-color: #e1ecf4;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  box-shadow: rgba(255, 255, 255, 0.7) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #39739d;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, 'Segoe UI', 'Liberation Sans',
    sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.15385;
  margin: 0;
  outline: none;
  padding: 8px 0.8em;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;
}

.btn-estate :hover,
.btn-estate :focus {
  background-color: #b3d3ea;
  color: #2c5777;
}

.btn-estate :focus {
  box-shadow: 0 0 0 4px rgba(0, 149, 255, 0.15);
}

.btn-estate :active {
  background-color: #a0c7e4;
  box-shadow: none;
  color: #2c5777;
}
.bold {
  font-size: 20px;
  font-weight: bold;
}
.content-view {
  display: flex;
  flex-wrap: wrap;
  /* height: 100vh; */
  margin-top: 15%;
  margin-left: 15rem;
  margin-right: 10rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.content-view__list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 3px solid rgba(167, 206, 201, 0.739);
  min-width: 34rem;
  margin-left: 8rem;
  height: 7rem;
  border-radius: 10px;
  width: 250px;
  border-left-color: rgb(228, 201, 136);
  position: relative;
  background: rgb(194, 222, 209);
}
.content-view__list h2,
p {
  margin-top: 1px;
  margin-bottom: 1px;
  color: rgb(53, 66, 89);
}
.content-view__list h2 {
  text-align: center;
}
.content-view__list a {
  text-decoration: none;
  color: white;
  position: absolute;
  right: 5px;
  bottom: 5px;
}
/* .content-view__list img{
      border-radius: 10%;
      position: absolute;
      width: 15rem;
      height: 12rem;
      right: 5px;
      top: 5px;
  } */
.content-view__list a:link,
a:visited,
a:active {
  text-decoration: none;
  color: white;
}
.content-view__list a:hover {
  text-decoration: none;
  color: rgb(53, 66, 89);
  transition: 0.2s;
}
.msg-err {
  margin-left: 49rem;
  text-align: center;
}
</style>
